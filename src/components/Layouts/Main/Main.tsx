import {
  Grid,
  Box,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Select,
  FormControl,
} from "book-ui";
import classnames from "classnames";

import styles from "./Main.module.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useMemo } from "react";

export const MainLayout = () => {
  const classNameVal = classnames(styles.main);

  const data = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 50; i++) {
      arr.push({
        name: `Data ${i + 1}`,
        value: Math.floor(Math.random() * 50) + 1,
      });
    }

    return arr;
  }, []);

  const barData = useMemo(() => {
    const arr = [];
    const date = new Date();

    for (let i = 0; i < 5; i++) {
      arr.push({
        name: date.toISOString(),
        positive: Math.floor(Math.random() * 5) + 1,
        negative: Math.floor(Math.random() * 5) + 1,
        neutral: Math.floor(Math.random() * 5) + 1,
        compound: -1,
      });
    }

    return arr;
  }, []);

  return (
    <div className={classNameVal}>
      {/*<GridRuler spacing="sm" />*/}
      <Grid container spacing="sm">
        <Grid item md={2} sm={12} xs={12}>
          <Box className={classnames(styles.sidebar)}>
            <ButtonGroup orientation="vertical">
              <Button className={classnames(styles.button)}>Analytics</Button>
              <Button className={classnames(styles.button)} disabled>
                Portfolio
              </Button>
              <Button className={classnames(styles.button)} disabled>
                Top Assets
              </Button>

              <Button className={classnames(styles.button)} disabled>
                Gainers & Losers
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item md={10} sm={12} xs={12}>
          <Box className={classnames(styles.content)}>
            <Grid container spacing="sm">
              <Grid item md={3} sm={0} xs={0} />
              <Grid item md={6} sm={12} xs={12}>
                <Box className={classnames(styles.centerBetween)}>
                  <Typography>Company</Typography>
                  <FormControl>
                    <Select label="Relation" variant="outlined">
                      <option value="amc">AMC</option>
                      <option value="gamestop">GameStop</option>
                      <option value="Cryptocurrency">Cryptocurrency</option>
                      <option value="bitcoin">Bitcoin</option>
                      <option value="ethereum">Ethereum</option>
                    </Select>
                  </FormControl>
                </Box>
                <br />
                <Box className={classnames(styles.centerBetween)}>
                  <Typography>Time period</Typography>
                  <FormControl>
                    <Select label="Time period" variant="outlined">
                      <option value="1">1 Quarter</option>
                      <option value="2">2 Quarters</option>
                      <option value="4">4 Quarters</option>
                      <option value="8">8 Quarters</option>
                      <option value="12">12 Quarters</option>
                    </Select>
                  </FormControl>
                </Box>
                <br />
                <Box className={classnames(styles.centerBetween)}>
                  <FormControl>
                    <TextField placeholder="Ticker" variant="outlined" />
                  </FormControl>
                  <Button>Search</Button>
                </Box>
              </Grid>
              <Grid item md={3} sm={0} xs={0} />
              <Grid item md={12} sm={12} xs={12}>
                <Box className={styles.chartContainerWrapper}>
                  <Typography>Fear and Greed index chart</Typography>
                  <Box className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                      {/*// BarChart*/}
                      <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="10 10" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="var(--color-warning-light)"
                        />
                        {/*<Bar*/}
                        {/*  dataKey="value"*/}
                        {/*  fill={"var(--color-primary-light)"}*/}
                        {/*/>*/}
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
                <Box className={styles.chartContainerWrapper}>
                  <Typography>Sentiment scores chart</Typography>
                  <Box className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={barData}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="10 10" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        {/*<Tooltip />*/}
                        <Legend />
                        <Bar dataKey="positive" fill={"var(--color-success)"} />
                        <Bar dataKey="negative" fill={"var(--color-error)"} />
                        <Bar dataKey="neutral" fill={"#c9c9c9"} />
                        <Bar
                          dataKey="compound"
                          fill={"var(--color-primary-light)"}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
