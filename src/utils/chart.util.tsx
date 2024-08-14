import { SentimentChartResponseDto } from "../dto/chart.dto.ts";

export type SentimentChart = {
  name?: string;
  positive?: number;
  negative?: number;
  neutral?: number;
  compound?: number;
};

export function normalizeSentimentChart(
  data: SentimentChartResponseDto[],
): SentimentChart[] {
  if (!data?.length) {
    return [];
  }

  const normalized: SentimentChart[] = [];
  const dataBySentiment: Record<string, SentimentChartResponseDto[]> = {};

  for (const item of data) {
    if (!dataBySentiment[item.sentiment]) {
      dataBySentiment[item.sentiment] = [item];
    } else {
      dataBySentiment[item.sentiment].push(item);
    }
  }

  while (
    dataBySentiment["positive"].length ||
    dataBySentiment["negative"].length ||
    dataBySentiment["neutral"].length ||
    dataBySentiment["compound"].length
  ) {
    const current: SentimentChart = {};
    for (const sentiment in dataBySentiment) {
      const value = dataBySentiment[sentiment];
      if (value?.length) {
        const first = value.pop();
        if (first) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          current[sentiment] = first.value;
        }
      }
    }
    normalized.push(current);
  }

  return normalized.map((item, index) => {
    item.name = new Date(Date.now() + index * 60000).toLocaleDateString();
    return item;
  }) as unknown as SentimentChart[];
}
