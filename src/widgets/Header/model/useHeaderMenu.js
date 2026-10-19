import { useEffect, useRef, useState } from 'react'
import { ptrm } from '@/shared/lib/dom/ptrm'
import { lockScroll } from '@/shared/lib/scroll/lockScroll'

const MOBILE_QUERY = `(width < ${ptrm(768)})`

export function useHeaderMenu() {
  const [isMobile, setIsMobile] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const media = matchMedia(MOBILE_QUERY)
    const update = () => {
      setIsMobile(media.matches)
      if (!media.matches) setIsMenuOpen(false)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isMobile || !isMenuOpen) return
    const unlockScroll = lockScroll()
    const content = [...document.querySelectorAll('main.main, footer.footer')]
    const previousInert = content.map((element) => element.inert)
    content.forEach((element) => {
      element.inert = true
    })
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector('a, button')?.focus())
    const closeAndFocus = () => {
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
    }
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target) && !menuButtonRef.current?.contains(event.target)) closeAndFocus()
    }
    const handleKeyDown = (event) => {
      if (event.defaultPrevented || event.isComposing || document.querySelector('dialog[open]')) return
      if (event.key === 'Escape') {
        event.preventDefault()
        closeAndFocus()
      }
      if (event.key !== 'Tab') return
      const elements = [
        menuButtonRef.current,
        ...menuRef.current.querySelectorAll('a[href], button:not(:disabled)'),
      ].filter((element) => element?.checkVisibility())
      const currentIndex = elements.indexOf(document.activeElement)
      const nextIndex = (currentIndex + (event.shiftKey ? -1 : 1) + elements.length) % elements.length
      event.preventDefault()
      elements[nextIndex]?.focus()
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      content.forEach((element, index) => {
        element.inert = previousInert[index]
      })
      unlockScroll()
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobile, isMenuOpen])

  return { isMobile, isMenuOpen, setIsMenuOpen, menuRef, menuButtonRef }
}
