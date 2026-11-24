const SELECTED_VIDEOS = [
  { label: "Featured TikTok 01", url: "https://vt.tiktok.com/ZSsLALB2v/" },
  { label: "Featured TikTok 02", url: "https://vt.tiktok.com/ZSsLSgN91/" },
  { label: "Featured TikTok 03", url: "https://vt.tiktok.com/ZSsLSaqhS/" },
];

type TikTokOEmbed = {
  title?: string;
  author_name?: string;
  thumbnail_url?: string;
  html?: string;
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function getVideoEmbed(video: (typeof SELECTED_VIDEOS)[number]) {
  try {
    const endpoint = new URL("https://www.tiktok.com/oembed");
    endpoint.searchParams.set("url", video.url);

    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return {
        ...video,
        title: video.label,
        authorName: "Xychen",
        thumbnailUrl: null,
        embedUrl: null,
      };
    }

    const data = (await response.json()) as TikTokOEmbed;
    const iframeMatch = data.html?.match(/<iframe\b[^>]*\bsrc=["']([^"']+)["']/i);
    let embedUrl: string | null = null;

    if (iframeMatch?.[1]) {
      try {
        const candidate = new URL(iframeMatch[1]);
        if (
          candidate.protocol === "https:" &&
          candidate.hostname === "www.tiktok.com" &&
          candidate.pathname.startsWith("/player/v1/")
        ) {
          embedUrl = candidate.toString();
        }
      } catch {
        embedUrl = null;
      }
    }

    const thumbnailUrl =
      typeof data.thumbnail_url === "string" &&
      data.thumbnail_url.startsWith("https://")
        ? data.thumbnail_url
        : null;

    return {
      ...video,
      title: data.title?.trim() || video.label,
      authorName: data.author_name?.trim() || "Xychen",
      thumbnailUrl,
      embedUrl,
    };
  } catch {
    return {
      ...video,
      title: video.label,
      authorName: "Xychen",
      thumbnailUrl: null,
      embedUrl: null,
    };
  }
}

async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405);
  }

  const items = await Promise.all(SELECTED_VIDEOS.map(getVideoEmbed));
  return json({ items });
}

export default { fetch: handleRequest };
