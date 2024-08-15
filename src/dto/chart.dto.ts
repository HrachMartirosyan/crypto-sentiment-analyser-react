import { PaginationDTO } from "./pagination.dto.ts";

export enum SentimentChartType {
  CONTENT = "content",
  COMMENTS = "comments",
}

export enum SentimentChartSentiment {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  NEUTRAL = "neutral",
}

export enum SentimentChartAnalysisModel {
  LEXICAN = "lexican",
  VADER = "vader",
}

export type SentimentChartQueryDto = {
  company: string;
  type?: SentimentChartType;
  sentiment?: SentimentChartSentiment;
  analysisModel?: SentimentChartAnalysisModel;
} & PaginationDTO;

export type SentimentChartResponseDto = {
  _id: string;
  company: string;
  type: SentimentChartType;
  sentiment: SentimentChartSentiment;
  value: SentimentChartAnalysisModel;
  quarter: string;
};
