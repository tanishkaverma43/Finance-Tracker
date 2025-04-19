"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types";

const categories = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function TransactionForm({ onAdd }: { onAdd: (t: Transaction) => void }) {
  const [form, setForm] = useState({ description: "", amount: "", date: "", category: categories[0] });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onAdd(data);
    setForm({ description: "", amount: "", date: "", category: categories[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <Input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
      <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <select className="w-full border rounded p-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
        {categories.map(cat => <option key={cat}>{cat}</option>)}
      </select>
      <Button type="submit">Add</Button>
    </form>
  );
}
