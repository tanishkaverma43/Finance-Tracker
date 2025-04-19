"use client";

import { useState } from "react";
import { Budget } from "@/types";

// Define props type
type Props = {
  onSave: (budget: Budget) => void;
};

export default function BudgetInput({ onSave }: Props) {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleSubmit = () => {
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    
    // Ensure that month is valid and passed correctly
    onSave({
      category,
      amount: Number(amount),
      month: currentMonth, // Ensure month is a valid string
    });

    setCategory("");
    setAmount("");
  };

  return (
    <div className="space-y-2">
      <input
        className="border px-2 py-1 rounded w-full"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="border px-2 py-1 rounded w-full"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Save Budget
      </button>
    </div>
  );
}
