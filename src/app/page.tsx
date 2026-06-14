import { getSiteContent } from "@/lib/content-service";
import { HomePage } from "@/components/HomePage";

export const revalidate = 60;

export default async function Page() {
  const content = await getSiteContent();
  return <HomePage initialContent={content} />;
}
