#!/usr/bin/env node
/**
 * Push the sitemap's URLs to IndexNow.
 *
 * IndexNow is a single submission that reaches Bing, Yandex, Seznam and Naver
 * at once. It matters more than it used to: Microsoft Copilot's citations come
 * out of the Bing index, so a page Bing has not crawled cannot be cited there
 * no matter how well it ranks in Google.
 *
 * Google does not participate. This is not a substitute for Search Console.
 *
 * Ownership is proved by hosting the key as a text file at the site root — see
 * public/<key>.txt. The file must stay deployed; if it disappears, submissions
 * start returning 403.
 *
 * Usage, after a deploy:
 *   npm run indexnow                 # everything in the sitemap
 *   npm run indexnow -- <url> <url>  # just these
 */

const KEY = '3540e45b3380fb7d4ad618c198f0e7a9';
const HOST = 'europackindia.com';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH = 10000; // IndexNow's documented per-request ceiling

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function describe(status) {
  return {
    200: 'OK — URLs accepted',
    202: 'Accepted — key still being validated, this is normal on a first run',
    400: 'Bad request — malformed payload',
    403: `Forbidden — key file not reachable at ${ORIGIN}/${KEY}.txt`,
    422: 'Unprocessable — a URL does not belong to this host',
    429: 'Rate limited — wait, then retry',
  }[status] ?? 'Unexpected response';
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.length ? args : await urlsFromSitemap();

  const foreign = urls.filter((u) => !u.startsWith(ORIGIN));
  if (foreign.length) {
    console.error(`Refusing to submit ${foreign.length} URL(s) not on ${HOST}:`);
    foreign.slice(0, 5).forEach((u) => console.error(`  ${u}`));
    process.exit(1);
  }

  console.log(`Submitting ${urls.length} URL(s) for ${HOST}`);

  for (let i = 0; i < urls.length; i += BATCH) {
    const urlList = urls.slice(i, i + BATCH);
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `${ORIGIN}/${KEY}.txt`,
        urlList,
      }),
    });
    console.log(`  batch ${i / BATCH + 1}: ${res.status} — ${describe(res.status)}`);
    if (res.status >= 400) process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
