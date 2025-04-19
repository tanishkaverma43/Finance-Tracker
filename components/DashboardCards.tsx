"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types";

export default function DashboardCards({ transactions }: { transactions: Transaction[] }) {
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  const latest = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const perCategory = transactions.reduce((acc: Record<string, number>, t) => {
    const category = t.category ?? "Uncategorized"; // fallback
    acc[category] = (acc[category] || 0) + Number(t.amount);
    return acc;
  }, {});

  const topCategory = Object.entries(perCategory)
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A"; // safe fallback

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div>Total Spent: ₹{total}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div>Top Category: {topCategory}</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-sm font-medium">Recent:</div>
          {latest.map((t) => (
            <div key={t._id}>
              {t.description} - ₹{t.amount}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
