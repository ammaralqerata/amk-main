import { redirect } from "next/navigation";
import { getDownloadUrl, TOOL_SLUGS } from "@/content/tools";
import type { ToolSlug } from "@/content/tools/types";

export function generateStaticParams() {
  return TOOL_SLUGS.map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string; slug: string }> },
) {
  const { slug } = await context.params;
  const downloadUrl = getDownloadUrl(slug as ToolSlug);

  if (!downloadUrl) {
    return new Response("Not found", { status: 404 });
  }

  redirect(downloadUrl);
}
