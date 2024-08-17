import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { SentimentChart } from "../../../utils/chart.util.tsx";

type Props = {
  data: SentimentChart[];
};

export const HorizontalBarChart: FC<Props> = ({ data }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <ResponsiveContainer width="100%" height="100%">
      <br />
      <br />
      <BarChart
        width={500}
        height={300}
        data={data}
        layout="vertical"
        barCategoryGap={1}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={150} />
        <Legend wrapperStyle={{ top: -40, left: 0 }} />
        <Tooltip
          contentStyle={{
            background: "var(--color-primary)",
            border: "none",
            color: "var(--color-text)",
          }}
        />
        <Bar dataKey="positive" fill={"var(--color-success)"} />
        <Bar dataKey="negative" fill={"var(--color-error)"} />
        <Bar dataKey="neutral" fill={"#c9c9c9"} />
        {/*<Bar dataKey="compound" fill={"var(--color-primary-light)"} />*/}
      </BarChart>
    </ResponsiveContainer>
  );
};
