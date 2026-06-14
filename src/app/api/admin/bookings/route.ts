import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const items = await Booking.find().sort({ createdAt: -1 });
  return NextResponse.json(
    items.map((d) => ({
      ...serializeDoc(d.toObject()),
      createdAt: d.createdAt?.toISOString(),
    }))
  );
}
