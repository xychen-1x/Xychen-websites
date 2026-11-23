import { get } from "@vercel/blob";
import { YOUTUBE_FEED_PATH, type YouTubeFeed } from "./_lib/youtube";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return json({
      status: "not-configured",
      lastSyncedAt: null,
      items: [],
    }, 200);
  }

  try {
    const blob = await get(YOUTUBE_FEED_PATH, { access: "private" });
    if (!blob) {
      return json({
        status: "pending-first-sync",
        lastSyncedAt: null,
        items: [],
      });
    }

    const feed = (await new Response(blob.stream).json()) as YouTubeFeed;
    return json({
      status: "ready",
      platform: feed.platform,
      channelHandle: feed.channelHandle,
      lastSyncedAt: feed.lastSyncedAt,
      items: Array.isArray(feed.items) ? feed.items : [],
    });
  } catch (error) {
    console.error(
      "[youtube-feed] Could not read stored feed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return json({ status: "unavailable", lastSyncedAt: null, items: [] }, 503);
  }
}
