export const config = {
  runtime: 'edge'
};

export default async function handler(req) {
  const url = new URL(req.url).searchParams.get('url');
  if (!url) return new Response('URL tidak ditemukan', { status: 400 });

  try {
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://www.visionplustv.id/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
        'Origin': 'https://www.visionplustv.id'
      }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/vnd.apple.mpegurl',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked'
      }
    });
  } catch (err) {
    return new Response('Stream gagal: ' + err.message, { status: 502 });
  }
}