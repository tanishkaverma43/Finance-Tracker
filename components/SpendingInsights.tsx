import { Transaction, Budget } from "@/types";

export default function SpendingInsights({
  budgets,
  transactions,
}: {
  budgets: Budget[];
  transactions: Transaction[];
}) {
  const categorySpending = transactions.reduce(
    (acc: Record<string, number>, t: Transaction) => {
        acc[t.category || 'Unknown'] = (acc[t.category || 'Unknown'] || 0) + Number(t.amount);
      return acc;
    },
    {}
  );

  const insights = budgets.map((b) => {
    const spent = categorySpending[b.category] || 0;
    const percentage = ((spent / b.amount) * 100).toFixed(0);
    return `${b.category}: ₹${spent} of ₹${b.amount} (${percentage}%)`;
  });

  return (
    <div className="space-y-1">
      <h2 className="font-medium">Spending Insights</h2>
      {insights.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  );
}
