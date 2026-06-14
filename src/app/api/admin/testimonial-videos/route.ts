import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TestimonialVideo, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const items = await TestimonialVideo.find().sort({ order: 1 });
  return NextResponse.json(items.map((d) => serializeDoc(d.toObject())));
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  await connectDB();
  const count = await TestimonialVideo.countDocuments();
  const item = await TestimonialVideo.create({ ...body, order: body.order ?? count });
  return NextResponse.json(serializeDoc(item.toObject()));
}
