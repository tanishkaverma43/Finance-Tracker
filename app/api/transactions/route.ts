import { db } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await db.collection("transactions").find({}).toArray();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const transaction = {
      ...body,
      amount: Number(body.amount),
      date: new Date(body.date),
    };

    const res = await db.collection("transactions").insertOne(transaction);
    return NextResponse.json({ _id: res.insertedId, ...transaction });
  } catch (error) {
    console.error("POST error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
