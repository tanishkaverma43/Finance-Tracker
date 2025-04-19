"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpensesChart from "@/components/ExpensesChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import DashboardCards from "@/components/DashboardCards";
import BudgetInput from "@/components/BudgetInput";
import BudgetChart from "@/components/BudgetChart";
import SpendingInsights from "@/components/SpendingInsights";
import { Budget, Transaction } from "@/types";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]); // New state for budgets

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Finance Dashboard</h1>

      {/* Total and Top Category Cards */}
      <DashboardCards transactions={transactions} />

      {/* Transaction Add Form */}
      <TransactionForm onAdd={(t) => setTransactions([...transactions, t])} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ExpensesChart data={transactions} />
        <CategoryPieChart data={transactions} />
      </div>

      {/* Transaction Table */}
      <TransactionList data={transactions} />

      {/* 🔥 Budgeting Section (Stage 3) */}
      <div className="space-y-4 border-t pt-4">
        <h2 className="text-xl font-semibold">Budgeting</h2>
        
        <BudgetInput onSave={(b) => setBudgets(prev => [...prev, b])} />

        <BudgetChart budgets={budgets} transactions={transactions} />

        <SpendingInsights budgets={budgets} transactions={transactions} />
      </div>
    </div>
  );
}
