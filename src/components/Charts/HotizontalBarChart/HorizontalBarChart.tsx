import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { SentimentChart } from "../../../utils/chart.util.tsx";

type Props = {
  data: SentimentChart[];
};

export const HorizontalBarChart: FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
        <Legend />
        <Bar dataKey="positive" fill={"var(--color-success)"} />
        <Bar dataKey="negative" fill={"var(--color-error)"} />
        <Bar dataKey="neutral" fill={"#c9c9c9"} />
        <Bar dataKey="compound" fill={"var(--color-primary-light)"} />
      </BarChart>
    </ResponsiveContainer>
  );
};
