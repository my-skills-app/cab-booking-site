import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { PopularFare, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();
  await connectDB();
  const item = await PopularFare.findByIdAndUpdate(id, body, { new: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePublicSite();
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
  await PopularFare.findByIdAndDelete(id);
  revalidatePublicSite();
  return NextResponse.json({ success: true });
}
