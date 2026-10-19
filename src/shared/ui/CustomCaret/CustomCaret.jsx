import { useLayoutEffect } from 'react'
import clsx from 'clsx'
import { ptrm } from '@/shared/lib/dom/ptrm'
import { getRootFontSize } from '@/shared/lib/dom/getRootFontSize'
const MIRRORED_PROPERTIES = [
  'border-block-end-width',
  'border-inline-start-width',
  'border-inline-end-width',
  'border-block-start-width',
  'box-sizing',
  'direction',
  'font-family',
  'font-feature-settings',
  'font-kerning',
  'font-size',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-weight',
  'letter-spacing',
  'line-height',
  'padding-block-end',
  'padding-inline-start',
  'padding-inline-end',
  'padding-block-start',
  'tab-size',
  'text-align',
  'text-indent',
  'text-transform',
  'word-spacing',
]
function getMirroredValue(control, selectionStart) {
  const value = control.value.slice(0, selectionStart)
  return control instanceof HTMLInputElement && control.type === 'password' ? '•'.repeat(value.length) : value
}
export function CustomCaret({ controlRef, fieldRef, initialPointerRef }) {
  useLayoutEffect(() => {
    const activeControl = controlRef.current
    const field = fieldRef.current
    if (!activeControl || !field) return
    // Email keeps its native type, validation and keyboard. Its selection API is
    // unavailable, so follow native editing events for the visual caret only.
    const emailSelections = new WeakMap()
    let emailPointerAnchor = null
    const isEmail = (control) => control instanceof HTMLInputElement && control.type === 'email'
    const emailSelection = (control) => {
      if (!emailSelections.has(control)) {
        emailSelections.set(control, {
          anchor: control.value.length,
          focus: control.value.length,
          value: control.value,
        })
      }
      return emailSelections.get(control)
    }
    const emailPoint = (control, clientX) => {
      const style = getComputedStyle(control)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      context.font = style.font
      context.letterSpacing = style.letterSpacing
      const offset =
        clientX -
        control.getBoundingClientRect().left -
        (parseFloat(style.paddingInlineStart) || 0) -
        (parseFloat(style.borderInlineStartWidth) || 0) +
        control.scrollLeft
      let previous = 0
      for (let index = 1; index <= control.value.length; index++) {
        const next = context.measureText(control.value.slice(0, index)).width
        if (offset < (previous + next) / 2) return index - 1
        previous = next
      }
      return control.value.length
    }
    let animationFrame = null
    let caretElement = null
    let resizeObserver = null
    let revealCaret = false
    let lastMeasurement = null
    const removeCaret = () => {
      caretElement?.remove()
      caretElement = null
    }
    const getCaretElement = () => {
      if (!caretElement) {
        caretElement = document.createElement('span')
        caretElement.className = 'custom-field__caret'
        caretElement.ariaHidden = 'true'
        caretElement.addEventListener('pointerdown', (event) => event.preventDefault())
      }
      if (caretElement.parentElement !== field) field.append(caretElement)
      return caretElement
    }
    const updateCaret = () => {
      animationFrame = null
      const control = activeControl
      if (
        !control ||
        (document.hasFocus() && document.activeElement !== control) ||
        control.disabled ||
        control.readOnly
      ) {
        removeCaret()
        return
      }
      let selectionStart = null
      let selectionEnd = null
      try {
        if (isEmail(control)) {
          const selection = emailSelection(control)
          selectionStart = Math.min(selection.anchor, selection.focus)
          selectionEnd = Math.max(selection.anchor, selection.focus)
        } else {
          selectionStart = control.selectionStart
          selectionEnd = control.selectionEnd
        }
      } catch {
        removeCaret()
        return
      }
      if (selectionStart === null || selectionEnd === null || selectionStart !== selectionEnd) {
        removeCaret()
        return
      }
      const computedStyle = window.getComputedStyle(control)
      const controlRectangle = control.getBoundingClientRect()
      if (controlRectangle.width <= 0 || controlRectangle.height <= 0) {
        removeCaret()
        return
      }
      animationFrame = window.requestAnimationFrame(updateCaret)
      const measurement = [
        controlRectangle.left,
        controlRectangle.top,
        controlRectangle.width,
        controlRectangle.height,
        control.scrollLeft,
        control.scrollTop,
        selectionStart,
        control.value,
        ...MIRRORED_PROPERTIES.map((property) => computedStyle.getPropertyValue(property)),
      ].join('|')
      if (measurement === lastMeasurement) return
      lastMeasurement = measurement
      const mirror = document.createElement('div')
      const marker = document.createElement('span')
      const isMultiline = control instanceof HTMLTextAreaElement
      mirror.className = clsx('custom-field__caret-mirror', isMultiline && 'custom-field__caret-mirror--multiline')
      marker.className = 'custom-field__caret-marker'
      for (const property of MIRRORED_PROPERTIES) {
        mirror.style.setProperty(property, computedStyle.getPropertyValue(property))
      }
      mirror.style.inlineSize = ptrm(
        isMultiline ? controlRectangle.width : Math.max(control.scrollWidth, controlRectangle.width),
        getRootFontSize(),
        2,
      )
      mirror.append(document.createTextNode(getMirroredValue(control, selectionStart)))
      marker.textContent = '​'
      mirror.append(marker)
      const remainingValue = control.value.slice(selectionStart)
      mirror.append(
        document.createTextNode(
          control instanceof HTMLInputElement && control.type === 'password'
            ? '•'.repeat(remainingValue.length)
            : remainingValue,
        ),
      )
      document.body.append(mirror)
      const mirrorRectangle = mirror.getBoundingClientRect()
      const markerRectangle = marker.getBoundingClientRect()
      const fontSize = Number.parseFloat(computedStyle.fontSize) || 16
      const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.25
      const caretHeight = Math.min(fontSize, lineHeight)
      const markerHeight = markerRectangle.height || lineHeight
      const contentTop =
        (Number.parseFloat(computedStyle.borderBlockStartWidth) || 0) +
        (Number.parseFloat(computedStyle.paddingBlockStart) || 0)
      const contentBottom =
        (Number.parseFloat(computedStyle.borderBlockEndWidth) || 0) +
        (Number.parseFloat(computedStyle.paddingBlockEnd) || 0)
      const singleLineBlockStart =
        controlRectangle.top + contentTop + (controlRectangle.height - contentTop - contentBottom - caretHeight) / 2
      const multilineBlockStart =
        controlRectangle.top +
        markerRectangle.top -
        mirrorRectangle.top -
        control.scrollTop +
        (markerHeight - caretHeight) / 2
      const insertionPoint = controlRectangle.left + markerRectangle.left - mirrorRectangle.left - control.scrollLeft
      const caret = getCaretElement()
      const caretWidth = caret.getBoundingClientRect().width
      const inlineStart = Math.max(
        controlRectangle.left,
        Math.min(controlRectangle.right - caretWidth, insertionPoint - caretWidth / 2),
      )
      const blockStart = isMultiline ? multilineBlockStart : singleLineBlockStart
      const scrollContainer = control.closest('.simplebar-content-wrapper')
      if (revealCaret && isMultiline && scrollContainer) {
        const scrollRectangle = scrollContainer.getBoundingClientRect()
        const delta =
          blockStart < scrollRectangle.top
            ? blockStart - scrollRectangle.top
            : Math.max(0, blockStart + caretHeight - scrollRectangle.bottom)
        const previousScrollTop = scrollContainer.scrollTop
        scrollContainer.scrollTop += delta
        if (scrollContainer.scrollTop !== previousScrollTop) {
          mirror.remove()
          scheduleCaretUpdate()
          return
        }
      }
      revealCaret = false
      let visibleTop = Math.max(0, controlRectangle.top)
      let visibleBottom = Math.min(window.innerHeight, controlRectangle.bottom)
      let visibleLeft = Math.max(0, controlRectangle.left)
      let visibleRight = Math.min(window.innerWidth, controlRectangle.right)
      for (let parent = control.parentElement; parent; parent = parent.parentElement) {
        const style = getComputedStyle(parent)
        const rect = parent.getBoundingClientRect()
        if (style.overflowY !== 'visible') {
          visibleTop = Math.max(visibleTop, rect.top)
          visibleBottom = Math.min(visibleBottom, rect.bottom)
        }
        if (style.overflowX !== 'visible') {
          visibleLeft = Math.max(visibleLeft, rect.left)
          visibleRight = Math.min(visibleRight, rect.right)
        }
      }
      const isVisible =
        insertionPoint >= visibleLeft &&
        insertionPoint <= visibleRight &&
        blockStart >= visibleTop &&
        blockStart + caretHeight <= visibleBottom
      mirror.remove()
      if (!isVisible) {
        removeCaret()
        return
      }
      const rootFontSize = getRootFontSize()
      caret.style.removeProperty('inset-block-start')
      caret.style.removeProperty('inset-inline-start')
      const origin = caret.getBoundingClientRect()
      caret.style.blockSize = ptrm(caretHeight, rootFontSize, 2)
      caret.style.insetBlockStart = ptrm(blockStart - origin.top, rootFontSize, 2)
      caret.style.insetInlineStart = ptrm(inlineStart - origin.left, rootFontSize, 2)
    }
    const scheduleCaretUpdate = () => {
      lastMeasurement = null
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(updateCaret)
    }
    const observeControl = (control) => {
      resizeObserver?.disconnect()
      resizeObserver = new ResizeObserver(() => {
        revealCaret = true
        scheduleCaretUpdate()
      })
      resizeObserver.observe(control)
      const scrollContainer = control.closest('.simplebar-content-wrapper')
      if (scrollContainer) resizeObserver.observe(scrollContainer)
      scheduleCaretUpdate()
    }
    const syncActiveControl = () => {
      revealCaret = true
      if (document.activeElement === activeControl || !document.hasFocus()) {
        scheduleCaretUpdate()
        return
      }
      removeCaret()
    }
    const handleControlEvent = (event) => {
      revealCaret = true
      if (isEmail(event.target) && event.type === 'input') {
        const control = event.target
        const selection = emailSelection(control)
        let prefix = 0
        while (
          prefix < selection.value.length &&
          prefix < control.value.length &&
          selection.value[prefix] === control.value[prefix]
        )
          prefix++
        let suffix = 0
        while (
          suffix < selection.value.length - prefix &&
          suffix < control.value.length - prefix &&
          selection.value.at(-suffix - 1) === control.value.at(-suffix - 1)
        )
          suffix++
        const start = Math.min(selection.anchor, selection.focus)
        const end = Math.max(selection.anchor, selection.focus)
        let position = control.value.length - suffix
        if (event.inputType?.startsWith('insert') && event.inputType !== 'insertReplacementText') {
          position = start + control.value.length - selection.value.length + end - start
        } else if (event.inputType?.startsWith('delete')) {
          position =
            end !== start ? start : selection.focus - Math.max(0, selection.value.length - control.value.length)
          if (event.inputType.endsWith('Forward')) position = start
        }
        selection.anchor = selection.focus = Math.max(0, Math.min(control.value.length, position))
        selection.value = control.value
      }
      if (event.target === activeControl) scheduleCaretUpdate()
    }
    const handleEmailPointer = (event) => {
      if (!isEmail(event.target)) return
      const selection = emailSelection(event.target)
      const position = emailPoint(event.target, event.clientX)
      if (event.type === 'pointerdown') {
        emailPointerAnchor = event.shiftKey ? selection.anchor : position
        selection.anchor = emailPointerAnchor
        selection.focus = position
      } else if (emailPointerAnchor !== null) {
        selection.focus = position
        if (event.type === 'pointerup') emailPointerAnchor = null
      }
      scheduleCaretUpdate()
    }
    const handleEmailKey = (event) => {
      if (!isEmail(event.target) || event.isComposing) return
      const control = event.target
      const selection = emailSelection(control)
      const modifier = event.ctrlKey || event.metaKey
      let position = selection.focus
      if (modifier && event.key.toLowerCase() === 'a') {
        selection.anchor = 0
        selection.focus = control.value.length
      } else if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const backward = event.key === 'ArrowLeft'
        if (event.key === 'Home' || event.key === 'ArrowUp') position = 0
        else if (event.key === 'End' || event.key === 'ArrowDown') position = control.value.length
        else if (!event.shiftKey && selection.anchor !== selection.focus)
          position = backward
            ? Math.min(selection.anchor, selection.focus)
            : Math.max(selection.anchor, selection.focus)
        else if (modifier) {
          const text = backward ? control.value.slice(0, position) : control.value.slice(position)
          const word = backward ? text.match(/\s*\S+\s*$/)?.[0] : text.match(/^\s*\S+\s*/)?.[0]
          position += (backward ? -1 : 1) * (word?.length || 0)
        } else position += backward ? -1 : 1
        selection.focus = Math.max(0, Math.min(control.value.length, position))
        if (!event.shiftKey) selection.anchor = selection.focus
      }
      scheduleCaretUpdate()
    }
    if (isEmail(activeControl) && initialPointerRef.current !== null) {
      const selection = emailSelection(activeControl)
      selection.anchor = selection.focus = emailPoint(activeControl, initialPointerRef.current)
    }
    initialPointerRef.current = null
    const events = ['input', 'click', 'keyup', 'select']
    for (const event of events) activeControl.addEventListener(event, handleControlEvent)
    activeControl.addEventListener('keydown', handleEmailKey)
    activeControl.addEventListener('pointerdown', handleEmailPointer)
    activeControl.addEventListener('pointermove', handleEmailPointer)
    activeControl.addEventListener('pointerup', handleEmailPointer)
    document.addEventListener('selectionchange', syncActiveControl)
    document.addEventListener('scroll', scheduleCaretUpdate, true)
    window.addEventListener('resize', scheduleCaretUpdate)
    window.visualViewport?.addEventListener('resize', scheduleCaretUpdate)
    window.visualViewport?.addEventListener('scroll', scheduleCaretUpdate)
    observeControl(activeControl)
    return () => {
      for (const event of events) activeControl.removeEventListener(event, handleControlEvent)
      activeControl.removeEventListener('keydown', handleEmailKey)
      activeControl.removeEventListener('pointerdown', handleEmailPointer)
      activeControl.removeEventListener('pointermove', handleEmailPointer)
      activeControl.removeEventListener('pointerup', handleEmailPointer)
      document.removeEventListener('selectionchange', syncActiveControl)
      document.removeEventListener('scroll', scheduleCaretUpdate, true)
      window.removeEventListener('resize', scheduleCaretUpdate)
      window.visualViewport?.removeEventListener('resize', scheduleCaretUpdate)
      window.visualViewport?.removeEventListener('scroll', scheduleCaretUpdate)
      resizeObserver?.disconnect()
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
      removeCaret()
    }
  }, [controlRef, fieldRef, initialPointerRef])
  return null
}
