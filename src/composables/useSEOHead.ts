import { useHead } from '@vueuse/head'

export interface SEOData {
  title: string
  description: string
  keywords: string
  canonical?: string
  ogImage?: string
}

export function useSEOHead(seo: SEOData) {
  const siteUrl = 'https://tools.lxs.best'
  const path = seo.canonical || '/'
  const fullUrl = `${siteUrl}${path}`

  useHead({
    title: seo.title,
    meta: [
      { name: 'description', content: seo.description },
      { name: 'keywords', content: seo.keywords },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: fullUrl },
      { property: 'og:image', content: seo.ogImage || `${siteUrl}/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.title },
      { name: 'twitter:description', content: seo.description },
    ],
    link: [
      { rel: 'canonical', href: fullUrl },
    ],
  })
}
