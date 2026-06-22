import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Settings, serializeDoc } from "@/lib/models";
import { requireAdmin } from "@/lib/admin-api";
import { revalidatePublicSite } from "@/lib/revalidate-site";

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
  const socialLinks = body.socialLinks ?? {};
  const settings = await Settings.findOneAndUpdate(
    { key: "site" },
    {
      $set: {
        phoneNumber: body.phoneNumber,
        contactEmail: body.contactEmail,
        socialLinks: {
          whatsapp: socialLinks.whatsapp ?? "",
          facebook: socialLinks.facebook ?? "",
          instagram: socialLinks.instagram ?? "",
          telegram: socialLinks.telegram ?? "",
          youtube: socialLinks.youtube ?? "",
          twitter: socialLinks.twitter ?? "",
        },
      },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  revalidatePublicSite();
  return NextResponse.json(serializeDoc(settings!.toObject()));
}
