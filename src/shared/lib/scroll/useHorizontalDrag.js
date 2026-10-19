import { useRef, useState } from 'react'

const INTERACTIVE_ELEMENTS =
  'a, button, input, textarea, select, label, summary, [contenteditable="true"], [role="button"], [role="link"]'
const DRAG_THRESHOLD = 7

export function useHorizontalDrag(scrollRef, onRelease) {
  const gestureRef = useRef(null)
  const hasDraggedRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const handlePointerDown = (event) => {
    hasDraggedRef.current = false
    if (!event.isPrimary || event.button !== 0 || event.target.closest(INTERACTIVE_ELEMENTS)) return
    gestureRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: scrollRef.current.scrollLeft,
      isDragging: false,
    }
  }

  const handlePointerMove = (event) => {
    const gesture = gestureRef.current
    if (!gesture || gesture.pointerId !== event.pointerId) return
    const deltaX = event.clientX - gesture.x
    const deltaY = event.clientY - gesture.y
    if (!gesture.isDragging) {
      if (Math.abs(deltaY) > DRAG_THRESHOLD && Math.abs(deltaY) > Math.abs(deltaX)) {
        gestureRef.current = null
        return
      }
      if (Math.abs(deltaX) < DRAG_THRESHOLD) return
      gesture.isDragging = true
      hasDraggedRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      setIsDragging(true)
    }
    event.preventDefault()
    scrollRef.current.scrollLeft = gesture.left - deltaX
  }

  const finishDrag = (event) => {
    const gesture = gestureRef.current
    if (!gesture || gesture.pointerId !== event.pointerId) return
    gestureRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
    if (!gesture.isDragging) return
    setIsDragging(false)
    if (event.type !== 'pointercancel') onRelease()
  }

  return {
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
      onLostPointerCapture: finishDrag,
      onClickCapture: (event) => {
        if (hasDraggedRef.current && event.detail > 0) {
          event.preventDefault()
          event.stopPropagation()
        }
      },
      onDragStart: (event) => {
        if (!event.target.closest(INTERACTIVE_ELEMENTS)) event.preventDefault()
      },
    },
  }
}
