"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "@/types";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

export default function CategoryPieChart({ data }: { data: Transaction[] }) {
  const categoryData: Record<string, number> = data.reduce((acc, t) => {
    const category = t.category ?? "Uncategorized"; // <-- safer fallback
    acc[category] = (acc[category] || 0) + Number(t.amount);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryData).map(([cat, amount]) => ({
    name: cat,
    value: amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80}>
          {pieData.map((_, idx) => (
            <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
