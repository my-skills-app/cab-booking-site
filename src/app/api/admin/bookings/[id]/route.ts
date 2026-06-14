import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  await connectDB();
  await Booking.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
