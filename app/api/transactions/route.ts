// app/api/transactions/route.ts
import { db } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.collection("transactions").find({}).toArray();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const transaction = {
    ...body,
    amount: Number(body.amount),
    date: new Date(body.date),
  };
  const res = await db.collection("transactions").insertOne(transaction);
  return NextResponse.json({ _id: res.insertedId, ...transaction });
}