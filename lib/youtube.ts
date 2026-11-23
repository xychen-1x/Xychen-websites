import { put } from "@vercel/blob";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const CHANNEL_HANDLE = "@xychenxycz";
const FEED_PATH = "creator-media/youtube-feed.json";
const MAX_UPLOADS = 24;

type YouTubeListResponse<T> = {
  items?: T[];
  error?: { message?: string };
};

type ChannelItem = {
  contentDetails?: {
    relatedPlaylists?: { uploads?: string };
  };
};

type PlaylistItem = {
  contentDetails?: { videoId?: string };
};

type VideoItem = {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    channelTitle?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
  statistics?: { viewCount?: string };
};

export type YouTubeFeedItem = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string | null;
  url: string;
  viewCount: number | null;
};

export type YouTubeFeed = {
  platform: "youtube";
  channelHandle: string;
  lastSyncedAt: string;
  items: YouTubeFeedItem[];
};

async function youtubeGet<T>(
  resource: string,
  params: Record<string, string>,
  apiKey: string,
): Promise<YouTubeListResponse<T>> {
  const url = new URL(`${YOUTUBE_API_BASE}/${resource}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(12_000),
  });

  if (!response.ok) {
    // Do not include the request URL: it contains the API key.
    throw new Error(`YouTube API request failed with status ${response.status}.`);
  }

  return (await response.json()) as YouTubeListResponse<T>;
}

function selectThumbnail(
  thumbnails: Record<string, { url?: string }> | undefined,
): string | null {
  if (!thumbnails) return null;

  for (const key of ["maxres", "standard", "high", "medium", "default"]) {
    const candidate = thumbnails[key]?.url;
    if (candidate && candidate.startsWith("https://")) return candidate;
  }

  return null;
}

export async function syncYouTubeFeed(): Promise<YouTubeFeed> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YOUTUBE_API_KEY is not configured.");

  const channelResponse = await youtubeGet<ChannelItem>(
    "channels",
    { part: "contentDetails", forHandle: CHANNEL_HANDLE },
    apiKey,
  );
  const uploadsPlaylistId =
    channelResponse.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    throw new Error("The configured YouTube channel or uploads playlist was not found.");
  }

  const playlistResponse = await youtubeGet<PlaylistItem>(
    "playlistItems",
    {
      part: "contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: String(MAX_UPLOADS),
    },
    apiKey,
  );

  const videoIds = (playlistResponse.items ?? [])
    .map((item) => item.contentDetails?.videoId)
    .filter((id): id is string => Boolean(id));

  let videos: VideoItem[] = [];
  if (videoIds.length > 0) {
    const videoResponse = await youtubeGet<VideoItem>(
      "videos",
      {
        part: "snippet,statistics",
        id: videoIds.join(","),
      },
      apiKey,
    );
    videos = videoResponse.items ?? [];
  }

  const items = videos
    .filter((video) => video.id && video.snippet?.title && video.snippet.publishedAt)
    .map((video): YouTubeFeedItem => {
      const rawViews = video.statistics?.viewCount;
      const parsedViews = rawViews === undefined ? null : Number(rawViews);

      return {
        id: video.id,
        title: video.snippet?.title ?? "Untitled video",
        description: (video.snippet?.description ?? "").slice(0, 240),
        publishedAt: video.snippet?.publishedAt ?? "",
        thumbnailUrl: selectThumbnail(video.snippet?.thumbnails),
        url: `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`,
        viewCount:
          parsedViews !== null && Number.isSafeInteger(parsedViews)
            ? parsedViews
            : null,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  const feed: YouTubeFeed = {
    platform: "youtube",
    channelHandle: CHANNEL_HANDLE,
    lastSyncedAt: new Date().toISOString(),
    items,
  };

  // Replace the snapshot only after all upstream requests have succeeded.
  // A failed sync therefore leaves the last successful feed untouched.
  await put(FEED_PATH, JSON.stringify(feed), {
    access: "private",
    contentType: "application/json; charset=utf-8",
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  return feed;
}

export const YOUTUBE_FEED_PATH = FEED_PATH;
