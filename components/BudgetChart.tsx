"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Budget, Transaction } from "@/types";

type Props = {
  budgets: Budget[];
  transactions: Transaction[];
};

export default function BudgetChart({ budgets, transactions }: Props) {
  // Ensure acc is typed as a Record with string keys and number values
  const categorySpending = transactions.reduce((acc: Record<string, number>, t) => {
    const category = t.category || "Unknown"; // Handle cases where category might be undefined
    const amount = Number(t.amount) || 0; // Ensure amount is a valid number

    // Accumulate spending per category
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const data = budgets.map(b => ({
    category: b.category,
    Budget: b.amount,
    Spent: categorySpending[b.category] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Budget" fill="#8884d8" />
        <Bar dataKey="Spent" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
