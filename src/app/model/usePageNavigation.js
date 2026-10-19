import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { getPageMeta } from './pageMeta'

export function usePageNavigation() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const viewport = document.querySelector(
        '.page > .simplebar-wrapper > .simplebar-mask > .simplebar-offset > .simplebar-content-wrapper',
      )
      if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' })
      else viewport?.scrollTo({ top: 0, behavior: 'instant' })
      const { title, description } = getPageMeta(pathname)
      document.title = title
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
      for (const name of ['og:title', 'twitter:title'])
        document.querySelector(`meta[property="${name}"],meta[name="${name}"]`)?.setAttribute('content', title)
      for (const name of ['og:description', 'twitter:description'])
        document.querySelector(`meta[property="${name}"],meta[name="${name}"]`)?.setAttribute('content', description)
      const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
      if (siteUrl) {
        document.querySelector('link[rel="canonical"]')?.setAttribute('href', siteUrl + pathname)
        document.querySelector('meta[property="og:url"]')?.setAttribute('content', siteUrl + pathname)
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
}
