import { PaginationDTO } from "./pagination.dto.ts";

export type SentimentChartQueryDto = {
  type?: string;
  sentiment?: string;
} & PaginationDTO;

export type SentimentChartResponseDto = {
  type: string;
  sentiment: string;
  value: number;
};
