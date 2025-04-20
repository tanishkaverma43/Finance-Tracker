// app/api/transactions/route.ts
import { db } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.collection("transactions").find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET transactions error:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Optional: Simple validation
    if (!body.title || !body.amount || !body.date || !body.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transaction = {
      ...body,
      amount: Number(body.amount),
      date: new Date(body.date),
    };

    const res = await db.collection("transactions").insertOne(transaction);
    return NextResponse.json({ _id: res.insertedId, ...transaction });

  } catch (error) {
    console.error("POST transactions error:", error);
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
  }
}
