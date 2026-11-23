# YouTube daily sync setup

The YouTube feed uses a daily Vercel Cron invocation, the public YouTube Data API, and a private Vercel Blob snapshot. The Astro site remains statically generated; only the two files under the root `api/` directory run as Vercel Functions.

## Required Vercel resources

1. Create a **private** Vercel Blob store and connect it to the `xychen-website` project. Prefer Vercel's OIDC connection: Vercel supplies `BLOB_STORE_ID` and short-lived, automatically rotated authentication for Functions. The Blob SDK handles this automatically. A legacy `BLOB_READ_WRITE_TOKEN` can be used as a fallback, but it is not required for OIDC.
2. In Google Cloud, create or select a project, enable **YouTube Data API v3**, and create an API key restricted to the YouTube Data API. Keep the key private.
3. Create a strong, random cron secret. Do not reuse a password.

Add these environment variables to the Vercel project:

| Variable | Purpose | Environments |
| --- | --- | --- |
| `YOUTUBE_API_KEY` | Reads public uploads and public view counts for `@xychenxycz` | Production, Preview |
| `CRON_SECRET` | Authorizes the scheduled sync endpoint | Production |
| `BLOB_STORE_ID` | Identifies the connected private store for OIDC authentication; supplied by Vercel | Production, Preview |
| `BLOB_READ_WRITE_TOKEN` | Optional legacy authentication fallback; do not add it when OIDC is already configured | Only if using token authentication |

Do not commit credentials or paste them into GitHub issues, pull requests, or chat. Connect the Blob store through Vercel so its store ID and OIDC authentication are configured automatically. Add `YOUTUBE_API_KEY` and `CRON_SECRET` directly in Vercel Project Settings → Environment Variables. If you use the legacy token method, keep `BLOB_READ_WRITE_TOKEN` in Vercel only. After changing environment variables or storage connections, redeploy the relevant environment so the Functions receive the configuration.

## Endpoints

- `GET /api/media`: reads the latest stored snapshot. It does not call YouTube on page views.
- `GET /api/cron/youtube-sync`: requires `Authorization: Bearer <CRON_SECRET>`; Vercel Cron supplies this header automatically when the secret is configured.

The scheduled job runs once daily at 03:00 UTC (11:00 AM Philippines time). On Vercel Hobby, the start can occur at any time within the scheduled hour.

## Data and failure behavior

- The sync reads the channel's uploads playlist instead of using the more quota-expensive search endpoint.
- It stores the latest 24 public uploads, publish timestamps, thumbnails, and public view counts.
- View counts are snapshots from the last successful daily sync, not live counters.
- The existing snapshot is replaced only after all YouTube requests succeed. A failed run leaves the previous snapshot intact.
- This integration only reads the channel configured in the code: `@xychenxycz`. It does not access other creators' content.
- Shorts are not automatically classified by this API implementation. The existing manually selected Shorts remain separate until a reliable classification method is added.

## Vercel Hobby schedule

The project is currently on Vercel Hobby. Hobby Cron supports one execution per day, with start-time precision within the scheduled hour. This schedule is intentionally daily and does not trigger a deployment for each sync.
