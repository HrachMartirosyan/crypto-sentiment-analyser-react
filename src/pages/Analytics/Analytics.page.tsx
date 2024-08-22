import classnames from "classnames";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  Icons,
  Image,
  Select,
  Typography,
} from "book-ui";

import styles from "./Analytics.page.module.scss";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useCompanyListQuery } from "../../tanstack/company.query.tsx";
import { HorizontalBarChart } from "../../components/Charts";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Feedback";
import { useSentimentChartQuery } from "../../tanstack/chart.query.tsx";
import { normalizeSentimentChart } from "../../utils/chart.util.tsx";
import {
  SentimentChartAnalysisModel,
  SentimentChartType,
} from "../../dto/chart.dto.ts";

const companyLocalData: Record<string, { text: string; imgSrc: string }> = {
  "a-m-c": {
    text: "AMC is the largest movie exhibition company in the United States and the largest throughout the world with approximately 900 theatres and 10,000 screens across the globe. AMC has propelled innovation in the exhibition industry by: deploying its Signature power-recliner seats; delivering enhanced food and beverage choices; generating greater guest engagement through its loyalty and subscription programs, web site and mobile apps; offering premium large format experiences and playing a wide variety of content including the latest Hollywood releases and independent programming.",
    imgSrc:
      "https://amc-theatres-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,w_1600/v1668798544/amc-cdn/general/our-brands/AMCLogo.png",
  },
  "game-stop": {
    text: "GameStop Corp. is an American video game, consumer electronics, and gaming merchandise retailer.[1] The company is headquartered in Grapevine, Texas (a suburb of Dallas), and is the largest video game retailer worldwide.[2] As of February 2024, the company operates 4,169 stores including 2,915 in the United States, 203 in Canada, 404 in Australia and 647 in Europe under the GameStop, EB Games, EB Games Australia, Micromania-Zing, ThinkGeek and Zing Pop Culture brands.[1][3] The company was founded in Dallas in 1984 as Babbage's, and took on its current name in 1999.",
    imgSrc:
      "https://inbestia.com/media/articulos/thumb/df1c0fd92deab0fa0b82c97865e564427abe0db2.jpg",
  },
  "crypto-currency": {
    text: "A cryptocurrency, crypto-currency, or crypto is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it. It has, in a financial point of view, grown to be its own asset class.",
    imgSrc:
      "https://www.stockgeist.ai/wp-content/uploads/2021/11/2stack-of-cryptocurrencies-2021-08-26-17-52-34-utc-1024x683.jpg.webp",
  },
};

export const AnalyticsPage = () => {
  const [type, setType] = useState<SentimentChartType>(
    SentimentChartType.CONTENT,
  );
  const [analysisModel, setAnalysisModel] =
    useState<SentimentChartAnalysisModel>(SentimentChartAnalysisModel.LEXICAN);

  const { data: companies, isLoading: companiesLoading } =
    useCompanyListQuery();

  const params = useParams();
  const companySlug = params.companyId || companies?.data?.[0].slug || "";

  const currentCompany = useMemo(
    () => companies?.data?.find((company) => company.slug === companySlug),
    [companies?.data, companySlug],
  );

  const { data: sentimentChart } = useSentimentChartQuery({
    company: currentCompany?.slug || "",
    type,
    analysisModel,
  });

  const onTypeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as SentimentChartType);
  }, []);

  const onAnalysisTypeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setAnalysisModel(e.target.value as SentimentChartAnalysisModel);
    },
    [],
  );

  const barData = useMemo(() => {
    if (!sentimentChart?.data?.length) {
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
      <Grid item md={12}>
        <br />
        <Box className={styles.center}>
          <Image
            width="420px"
            height="280px"
            alt={currentCompany?.name}
            src={localData?.imgSrc}
          />
        </Box>
      </Grid>
      <Grid item md={12}>
        <br />
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
        <br />
        <Box className={classnames(styles.centerBetween)}>
          <FormControl>
            <Select
              label="Type"
              variant="outlined"
              value={type}
              onChange={onTypeChange}
              hideNoneValue
            >
              <option value={SentimentChartType.CONTENT}>Content</option>
              <option value={SentimentChartType.COMMENTS}>Comments</option>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item md={6}>
        <br />
        <Box className={classnames(styles.centerBetween)}>
          <Typography>VADER/Lexicon</Typography>
          <FormControl>
            <Select
              label="VADER/Lexicon"
              variant="outlined"
              value={analysisModel}
              onChange={onAnalysisTypeChange}
              hideNoneValue
            >
              <option value={SentimentChartAnalysisModel.VADER}>VADER</option>
              <option value={SentimentChartAnalysisModel.LEXICAN}>
                Lexican
              </option>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Box className={styles.chartContainerWrapper}>
          {/*<Typography>Sentiment scores chart</Typography>*/}
          <Box className={styles.chartWrapper}>
            <HorizontalBarChart data={barData} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
