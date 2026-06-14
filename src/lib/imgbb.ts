const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

type ImgbbResponse = {
  success: boolean;
  status: number;
  data?: {
    url: string;
    display_url: string;
    delete_url?: string;
  };
  error?: {
    message?: string;
    code?: number;
  };
  status_txt?: string;
};

export async function uploadImageToImgbb(file: Blob, filename?: string) {
  const key = process.env.IMGBB_API_KEY;
  if (!key) {
    throw new Error("IMGBB_API_KEY is not configured");
  }

  const body = new FormData();
  body.append("key", key);
  body.append("image", file, filename || "upload.jpg");

  const res = await fetch(IMGBB_UPLOAD_URL, { method: "POST", body });
  const data = (await res.json()) as ImgbbResponse;

  if (!data.success || !data.data?.url) {
    throw new Error(data.error?.message || data.status_txt || "ImgBB upload failed");
  }

  return {
    url: data.data.url,
    displayUrl: data.data.display_url,
    deleteUrl: data.data.delete_url,
  };
}
