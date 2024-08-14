import classnames from "classnames";
import {
  Grid,
  Box,
  Typography,
  Image,
  ButtonGroup,
  Button,
  Icons,
  FormControl,
  Select,
} from "book-ui";

import styles from "./Analytics.page.module.scss";
import { useMemo } from "react";
import { useCompanyListQuery } from "../../tanstack/company.query.tsx";
import { HorizontalBarChart } from "../../components/Charts";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Feedback";
import { useSentimentChartQuery } from "../../tanstack/chart.query.tsx";
import { normalizeSentimentChart } from "../../utils/chart.util.tsx";

const companyLocalData: Record<string, { text: string; imgSrc: string }> = {
  "a-m-c": {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque\n" +
      "expedita id in ipsa maxime molestiae, molestias nisi non optio quam\n" +
      "quas quia similique. Accusamus aspernatur dolor dolores eligendi\n" +
      "ipsa ipsam perferendis qui, repudiandae sit ut. Consequatur deleniti\n" +
      "dolore inventore ipsam maiores minus nam pariatur, praesentium sint.\n" +
      "Alias asperiores aut dolorem dolores in magnam nesciunt, nulla sequi\n" +
      "totam voluptate. Aliquam amet esse illo iste porro quibusdam quo,\n" +
      "temporibus! Id ipsa iste laborum laudantium magni mollitia placeat,\n" +
      "quis reiciendis rerum vel.",
    imgSrc:
      "https://www.stockgeist.ai/wp-content/uploads/2021/11/2stack-of-cryptocurrencies-2021-08-26-17-52-34-utc-1024x683.jpg.webp",
  },
  "game-stop": {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque\n" +
      "expedita id in ipsa maxime molestiae, molestias nisi non optio quam\n" +
      "quas quia similique. Accusamus aspernatur dolor dolores eligendi\n" +
      "ipsa ipsam perferendis qui, repudiandae sit ut. Consequatur deleniti\n" +
      "dolore inventore ipsam maiores minus nam pariatur, praesentium sint.\n" +
      "Alias asperiores aut dolorem dolores in magnam nesciunt, nulla sequi\n" +
      "totam voluptate. Aliquam amet esse illo iste porro quibusdam quo,\n" +
      "temporibus! Id ipsa iste laborum laudantium magni mollitia placeat,\n" +
      "quis reiciendis rerum vel.",
    imgSrc:
      "https://www.stockgeist.ai/wp-content/uploads/2021/11/2stack-of-cryptocurrencies-2021-08-26-17-52-34-utc-1024x683.jpg.webp",
  },
  "crypto-currency": {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque\n" +
      "expedita id in ipsa maxime molestiae, molestias nisi non optio quam\n" +
      "quas quia similique. Accusamus aspernatur dolor dolores eligendi\n" +
      "ipsa ipsam perferendis qui, repudiandae sit ut. Consequatur deleniti\n" +
      "dolore inventore ipsam maiores minus nam pariatur, praesentium sint.\n" +
      "Alias asperiores aut dolorem dolores in magnam nesciunt, nulla sequi\n" +
      "totam voluptate. Aliquam amet esse illo iste porro quibusdam quo,\n" +
      "temporibus! Id ipsa iste laborum laudantium magni mollitia placeat,\n" +
      "quis reiciendis rerum vel.",
    imgSrc:
      "https://www.stockgeist.ai/wp-content/uploads/2021/11/2stack-of-cryptocurrencies-2021-08-26-17-52-34-utc-1024x683.jpg.webp",
  },
};

export const AnalyticsPage = () => {
  const { data: companies, isLoading: companiesLoading } =
    useCompanyListQuery();

  const params = useParams();
  const companySlug = params.companyId || companies?.data?.[0].slug || "";
  const currentCompany = useMemo(
    () => companies?.data?.find((company) => company.slug === companySlug),
    [companies?.data, companySlug],
  );

  const { data: sentimentChart } = useSentimentChartQuery({
    type: currentCompany?.slug,
  });

  const barData = useMemo(() => {
    if (!sentimentChart?.data.length) {
      return [];
    }

    return normalizeSentimentChart(sentimentChart?.data);
  }, [sentimentChart?.data]);

  const localData = useMemo(() => companyLocalData[companySlug], [companySlug]);

  if (companiesLoading) {
    return <Loading />;
  }

  return (
    <Grid container spacing="sm">
      <Box className={styles.buttonGroupWrapper}>
        {companiesLoading && <Icons.Loading width="50px" height="50px" />}

        {companies?.data?.length ? (
          <>
            <ButtonGroup>
              {companies.data.map((company) => (
                <Button
                  href={`/analytics/${company.slug}`}
                  className={classnames(styles.button)}
                >
                  {company.name}
                </Button>
              ))}
            </ButtonGroup>
            <br />
          </>
        ) : (
          <></>
        )}
      </Box>
      <Grid item md={12} />

      <Grid item md={6}>
        <Box className={styles.center}>
          <Image
            width="420px"
            height="280px"
            alt={currentCompany?.name}
            src={localData?.imgSrc}
          />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box className={classnames(styles.center, styles.flexColumn)}>
          <Typography component="h3" variant="h3">
            {currentCompany?.name}
          </Typography>
          <br />
          <Typography className={styles.mobileText}>
            {localData?.text}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={12} />
      <Grid item md={12} />
      <Grid item md={6}>
        <Box className={classnames(styles.centerBetween)}>
          <FormControl>
            <Select label="Type" variant="outlined">
              <option value="1">Content</option>
              <option value="2">Comments</option>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box className={classnames(styles.centerBetween)}>
          <Typography>VADER/Lexicon</Typography>
          <FormControl>
            <Select label="Type" variant="outlined">
              <option value="1">VADER</option>
              <option value="2">Lexicon</option>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Box className={styles.chartContainerWrapper}>
          <Typography>Sentiment scores chart</Typography>
          <Box className={styles.chartWrapper}>
            <HorizontalBarChart data={barData} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
