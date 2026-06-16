import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { PricingFare, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const items = await PricingFare.find().sort({ order: 1 });
  return NextResponse.json(items.map((d) => serializeDoc(d.toObject())));
}

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();
  await connectDB();
  const count = await PricingFare.countDocuments();
  const item = await PricingFare.create({ ...body, order: body.order ?? count });
  revalidatePublicSite();
  return NextResponse.json(serializeDoc(item.toObject()));
}
