"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";

const categories = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function TransactionForm({
  onAdd,
}: {
  onAdd: (t: Transaction) => void;
}) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    category: categories[0],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!form.description || !form.amount || !form.date || !form.category) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          date: new Date(form.date).toISOString(), // ISO format
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Unknown error");
      }

      const data = await res.json();
      onAdd(data);

      // Reset form
      setForm({
        description: "",
        amount: "",
        date: "",
        category: categories[0],
      });
    } catch (error: any) {
      alert(`Failed to add transaction: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <Input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <select
        className="w-full border rounded p-2"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <Button type="submit">Add</Button>
    </form>
  );
}
