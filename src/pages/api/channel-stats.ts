import type { APIRoute } from 'astro';
import channelInfo from '../../data/channel-info.json';

export const prerender = false;

const CHANNEL_ID = channelInfo.channel.id; // UCxAGlEdCHFwzComLKy2rxTg

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;

  // Fallback to static data if no API key configured
  if (!apiKey) {
    const s = channelInfo.channel.statistics;
    return new Response(
      JSON.stringify({ viewCount: s.viewCount, subscriberCount: s.subscriberCount, videoCount: s.videoCount }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 's-maxage=86400' } }
    );
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
    const data = await res.json();
    const stats = data?.items?.[0]?.statistics;
    if (!stats) throw new Error('No statistics in response');

    return new Response(
      JSON.stringify({
        viewCount: stats.viewCount,
        subscriberCount: stats.subscriberCount,
        videoCount: stats.videoCount,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Cache on Vercel CDN for 24 hours; stale-while-revalidate for another 1h
          'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
        },
      }
    );
  } catch {
    // On any error return the static fallback so the page never breaks
    const s = channelInfo.channel.statistics;
    return new Response(
      JSON.stringify({ viewCount: s.viewCount, subscriberCount: s.subscriberCount, videoCount: s.videoCount }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Cache-Control': 's-maxage=300' } }
    );
  }
};
