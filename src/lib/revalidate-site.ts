import { revalidatePath } from "next/cache";

/** Clear cached pages so admin edits appear immediately on the public site. */
export function revalidatePublicSite() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/api/content");
}
