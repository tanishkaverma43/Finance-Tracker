// components/ExpensesChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "@/types";

export default function ExpensesChart({ data }: { data: Transaction[] }) {
  const monthly = data.reduce((acc: any, t) => {
    const m = new Date(t.date).toLocaleString("default", { month: "short" });
    acc[m] = (acc[m] || 0) + Number(t.amount);
    return acc;
  }, {});
  const chartData = Object.entries(monthly).map(([month, amount]) => ({ month, amount }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
