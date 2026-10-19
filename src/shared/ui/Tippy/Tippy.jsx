import { cloneElement, useCallback, useEffect, useRef } from 'react'
import tippy from 'tippy.js'
import './Tippy.scss'

export function Tippy({ children, content, placement = 'top' }) {
  const referenceRef = useRef(null)
  const originalRef = children.props.ref
  const handleReference = useCallback(
    (element) => {
      referenceRef.current = element
      if (typeof originalRef === 'function') originalRef(element)
      else if (originalRef) originalRef.current = element
    },
    [originalRef],
  )

  useEffect(() => {
    const element = referenceRef.current
    if (!element || !content) return
    const instance = tippy(element, {
      content,
      placement,
      appendTo: element.closest('dialog') ?? document.body,
      trigger: 'mouseenter focus',
      touch: false,
      delay: [250, 0],
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : [120, 100],
      aria: { content: null, expanded: false },
      theme: 'estatein',
      maxWidth: 260,
    })
    return () => instance.destroy()
  }, [content, placement])

  return cloneElement(children, { ref: handleReference })
}
