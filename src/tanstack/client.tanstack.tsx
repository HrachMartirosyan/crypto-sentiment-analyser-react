import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
export const queryKeys = {
  GET_USER: "getUser",
  GET_COMPANY_LIST: "getCompanyList",
  GET_SENTIMENT_CHART: "getSentimentChart",
};
