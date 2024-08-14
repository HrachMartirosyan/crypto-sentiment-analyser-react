import { instance } from "./axios.tsx";
import { AxiosResponse } from "axios";
import {
  SentimentChartQueryDto,
  SentimentChartResponseDto,
} from "../dto/chart.dto.ts";

const BASE: string = "/chart";

export async function getSentimentChart_api(
  query: SentimentChartQueryDto,
): Promise<AxiosResponse<SentimentChartResponseDto[]>> {
  return await instance.get(`${BASE}/sentiment`, {
    params: query,
  });
}
