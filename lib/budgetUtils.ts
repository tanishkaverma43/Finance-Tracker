import { Budget, Transaction } from "@/types";

export function calculateCategorySpending(transactions: Transaction[]) {
  return transactions.reduce((acc: Record<string, number>, t: Transaction) => {
    const category = String(t.category); // ✅ Ensure the key is a string
    const amount = Number(t.amount);

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += amount;

    return acc;
  }, {});
}
