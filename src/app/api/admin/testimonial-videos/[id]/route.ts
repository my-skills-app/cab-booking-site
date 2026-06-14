import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { TestimonialVideo, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();
  await connectDB();
  const item = await TestimonialVideo.findByIdAndUpdate(id, body, { new: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serializeDoc(item.toObject()));
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  await connectDB();
  await TestimonialVideo.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
