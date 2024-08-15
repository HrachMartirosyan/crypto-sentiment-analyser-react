import { SentimentChartResponseDto } from "../dto/chart.dto.ts";

export type SentimentChart = {
  name?: string;
  positive?: number;
  negative?: number;
  neutral?: number;
};

export function normalizeSentimentChart(
  data: SentimentChartResponseDto[],
): SentimentChart[] {
  if (!data?.length) {
    return [];
  }

  const dataByQuarter: Record<string, SentimentChart> = {};

  for (const item of data) {
    if (!dataByQuarter[item.quarter]) {
      dataByQuarter[item.quarter] = {
        name: item.quarter,
        [item.sentiment]: item.value,
      };
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      dataByQuarter[item.quarter][item.sentiment] = item.value;
    }
  }

  return Object.values(dataByQuarter);
}
