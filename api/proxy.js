// api/proxy.js — VERSI FINAL (ANTI 500, HEADERS LENGKAP)
export const config = { 
  runtime: 'edge',
  // Tambah timeout lebih lama
  maxDuration: 30
};

export default async function handler(req) {
  const url = new URL(req.url).searchParams.get('url');
  if (!url) return new Response('Missing ?url=', { status: 400 });

  // Tambah timeout manual
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000); // 25 detik

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Referer': 'https://www.visionplus.id/',
        'Origin': 'https://www.visionplus.id',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Stream error: ${response.status} ${response.statusText}`);
    }

    const headers = new Headers();
    const contentType = response.headers.get('content-type') || 'application/vnd.apple.mpegurl';
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Cache-Control', 'no-cache, no-store');
    headers.set('Transfer-Encoding', 'chunked');

    return new Response(response.body, { status: 200, headers });

  } catch (error) {
    clearTimeout(timeout);
    console.error('Proxy error:', error.message);
    return new Response(`Proxy gagal: ${error.name === 'AbortError' ? 'Timeout' : error.message}`, { status: 502 });
  }
}
