import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./client.tanstack.tsx";
import { SentimentChartQueryDto } from "../dto/chart.dto.ts";
import { getSentimentChart_api } from "../api/chart.api.tsx";

export const useSentimentChartQuery = ({
  type,
  sentiment,
  skip,
  limit,
}: SentimentChartQueryDto) => {
  return useQuery({
    queryKey: [queryKeys.GET_SENTIMENT_CHART, type, sentiment, skip, limit],
    queryFn: async () => {
      return getSentimentChart_api({
        type,
        sentiment,
        skip,
        limit,
      });
    },
  });
};
