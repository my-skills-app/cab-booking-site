import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { forceSeedDatabase, getSeedCounts, seedDatabaseIfEmpty } from "@/lib/seed";
import { requireAdmin } from "@/lib/admin-api";
import { revalidatePublicSite } from "@/lib/revalidate-site";

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectDB();
    const body = await request.json().catch(() => ({}));
    const force = body.force === true;

    if (force) {
      await forceSeedDatabase();
    } else {
      const seeded = await seedDatabaseIfEmpty();
      if (!seeded) {
        return NextResponse.json({
          success: true,
          message: "Database already has data. Use force=true to replace.",
          counts: await getSeedCounts(),
        });
      }
    }

    const counts = await getSeedCounts();
    revalidatePublicSite();
    return NextResponse.json({
      success: true,
      message: force ? "Static data imported." : "Static data seeded.",
      counts,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database. Check MongoDB connection." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectDB();
    const counts = await getSeedCounts();
    return NextResponse.json({ connected: true, counts });
  } catch (error) {
    console.error("Seed status error:", error);
    return NextResponse.json({
      connected: false,
      error: "MongoDB not connected.",
    });
  }
}
