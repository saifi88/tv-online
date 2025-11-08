export const config = { runtime: 'edge' };

export default async function handler(request) {
  const url = new URL(request.url).searchParams.get('url');
  if (!url) return new Response('?url= missing', { status: 400 });

  try {
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://www.visionplus.id/',
        'User-Agent': 'Mozilla/5.0',
        'Origin': 'https://www.visionplus.id'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/vnd.apple.mpegurl',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (e) {
    return new Response('Proxy error: ' + e.message, { status: 502 });
  }
}