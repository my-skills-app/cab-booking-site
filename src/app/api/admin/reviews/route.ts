import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { CustomerReview, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";
import { generateFakeReview } from "@/lib/fake-review-generator";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const items = await CustomerReview.find().sort({ createdAt: -1 });
  return NextResponse.json(items.map((d) => serializeDoc(d.toObject())));
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  await connectDB();
  const item = await CustomerReview.create(body);
  return NextResponse.json(serializeDoc(item.toObject()));
}

export async function PUT(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { action, count = 1 } = await request.json();
  if (action === "generate") {
    await connectDB();
    const reviews = Array.from({ length: Math.min(count, 10) }, () => generateFakeReview());
    const created = await CustomerReview.insertMany(reviews);
    return NextResponse.json(created.map((d) => serializeDoc(d.toObject())));
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
