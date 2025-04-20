// app/api/transactions/route.ts
import { db } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const database = await db;
  const data = await database.collection("transactions").find({}).toArray();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.description || !body.amount || !body.date || !body.category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transaction = {
      ...body,
      amount: Number(body.amount),
      date: new Date(body.date),
    };

    const database = await db;
    const res = await database.collection("transactions").insertOne(transaction);

    return NextResponse.json({ _id: res.insertedId, ...transaction });
  } catch (err) {
    console.error("Error in POST /api/transactions:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
