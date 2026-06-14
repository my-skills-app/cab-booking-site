import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-api";
import { uploadImageToImgbb } from "@/lib/imgbb";

const MAX_SIZE = 32 * 1024 * 1024;

export async function POST(request: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Image must be under 32 MB" }, { status: 400 });
    }

    const filename = file instanceof File ? file.name : "upload.jpg";
    const result = await uploadImageToImgbb(file, filename);

    return NextResponse.json({
      url: result.url,
      displayUrl: result.displayUrl,
      deleteUrl: result.deleteUrl,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
