import { syncYouTubeFeed } from "../_lib/youtube";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405);
  }

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return json({ error: "Unauthorized." }, 401);
  }

  if (!process.env.YOUTUBE_API_KEY || !process.env.BLOB_READ_WRITE_TOKEN) {
    return json({ error: "YouTube sync is not configured." }, 503);
  }

  try {
    const feed = await syncYouTubeFeed();
    return json({
      ok: true,
      platform: feed.platform,
      syncedAt: feed.lastSyncedAt,
      itemCount: feed.items.length,
    });
  } catch (error) {
    // Keep provider details and credentials out of the public response.
    console.error(
      "[youtube-sync] Sync failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return json({ error: "YouTube sync failed. The previous snapshot was preserved." }, 502);
  }
}
