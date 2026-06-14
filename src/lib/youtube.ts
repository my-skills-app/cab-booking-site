/**
 * Converts normal YouTube URLs to embed format for iframe players.
 * Supports watch, youtu.be, shorts, live, and already-embed URLs.
 */
export function toYouTubeEmbedUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return trimmed;

  if (/youtube\.com\/embed\//i.test(trimmed)) {
    return trimmed;
  }

  let videoId: string | null = null;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else {
        const parts = parsed.pathname.split("/").filter(Boolean);
        const type = parts[0];
        if (type === "embed" && parts[1]) {
          return trimmed;
        }
        if ((type === "shorts" || type === "live" || type === "v") && parts[1]) {
          videoId = parts[1];
        }
      }
    }
  } catch {
    return trimmed;
  }

  if (!videoId) return trimmed;

  const cleanId = videoId.split("&")[0].split("?")[0];
  return `https://www.youtube.com/embed/${cleanId}`;
}

export function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/i.test(url.trim());
}
