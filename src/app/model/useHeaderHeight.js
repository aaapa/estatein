import { useLayoutEffect, useRef, useState } from 'react'
import { ptrm } from '@/shared/lib/dom/ptrm'

export function useHeaderHeight() {
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(ptrm(0))

  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header) return
    const updateHeight = () => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
      setHeaderHeight(ptrm(header.getBoundingClientRect().height, rootFontSize))
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return { headerRef, headerHeight }
}
