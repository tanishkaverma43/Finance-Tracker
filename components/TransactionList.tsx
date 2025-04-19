// components/TransactionList.tsx
import { Transaction } from "@/types";

export default function TransactionList({ data }: { data: Transaction[] }) {
  return (
    <ul className="space-y-2">
      {data.map((t) => (
        <li key={t._id} className="border p-2 rounded-md">
          <div>{t.description} - ₹{t.amount}</div>
          <div className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</div>
        </li>
      ))}
    </ul>
  );
}
