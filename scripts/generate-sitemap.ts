import { writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE = 'https://lxs.best'

const staticPages = ['/', '/about', '/contact', '/privacy-policy', '/terms']

const toolSlugs = [
  'json-formatter',
  'json-compare',
  'header-formatter',
  'cookie-formatter',
  'dict-formatter',
  'js-formatter',
  'html-formatter',
  'curl-to-requests',
  'curl-to-feapder',
  'url-param-extract',
  'url-encode-decode',
  'html-render',
  'text-decode',
  'text-compare',
]

function xml(urls: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE}${u}</loc>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : u.startsWith('/tool/') ? '0.9' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`
}

const all = [...staticPages, ...toolSlugs.map(s => `/tool/${s}`)]
writeFileSync(resolve('public/sitemap.xml'), xml(all))
console.log(`✓ sitemap.xml generated with ${all.length} URLs`)
