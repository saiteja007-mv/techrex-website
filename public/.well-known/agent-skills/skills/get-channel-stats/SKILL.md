# Get TechRex Channel Statistics

Use this skill when a user asks about the TechRex YouTube channel size,
subscriber count, view count, or total videos.

## Endpoint

`GET https://techrex.saitejamothukuri.com/api/channel-stats`

Returns JSON:

```json
{
  "viewCount": "9885",
  "subscriberCount": "86",
  "videoCount": "19"
}
```

All three fields are strings (YouTube Data API v3 convention).

## Caching

Vercel edge cache: 24h, stale-while-revalidate 1h. Safe to call frequently.

## Underlying data

Backed by the YouTube Data API v3 `channels.list?part=statistics` for
`UCxAGlEdCHFwzComLKy2rxTg` (@The_TechRex). Falls back to last-known values on
upstream failure so it never 5xx's.

## RSS alternative

For the latest videos list (titles + links), use the YouTube RSS feed:
`https://www.youtube.com/feeds/videos.xml?channel_id=UCxAGlEdCHFwzComLKy2rxTg`
