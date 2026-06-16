import { getSiteContent } from "@/lib/content-service";
import { HomePage } from "@/components/HomePage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await getSiteContent();
  return <HomePage initialContent={content} />;
}
