import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Settings, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const settings = await Settings.findOne({ key: "site" });
  return NextResponse.json(settings ? serializeDoc(settings.toObject()) : null);
}

export async function PUT(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  await connectDB();
  const settings = await Settings.findOneAndUpdate(
    { key: "site" },
    { phoneNumber: body.phoneNumber, contactEmail: body.contactEmail },
    { new: true, upsert: true }
  );
  return NextResponse.json(serializeDoc(settings!.toObject()));
}
