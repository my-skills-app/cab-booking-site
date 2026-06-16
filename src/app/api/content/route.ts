import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error("Content fetch error:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}
