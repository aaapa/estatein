import clsx from 'clsx'
import IMask from 'imask'
import { Scroll } from '@/shared/ui/Scroll'
import { CustomCaret } from '@/shared/ui/CustomCaret'
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { ptrm } from '@/shared/lib/dom/ptrm'
import { getFieldConstraints, getFieldValidationMessage } from '@/shared/lib/forms/fieldConstraints'
import './CustomField.scss'
export const CustomField = memo(
  forwardRef(function CustomField(
    {
      className,
      autoComplete = 'off',
      controlClassName,
      descriptionId,
      disabled = false,
      error = '',
      inputMode = 'text',
      label,
      labelClassName,
      multiline = false,
      name,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      readOnly = false,
      required = false,
      rows = 5,
      type = 'text',
      value,
      ...controlProps
    },
    forwardedRef,
  ) {
    const rootRef = useRef(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const controlRef = useRef(null)
    const caretPointerRef = useRef(null)
    const constraints = useMemo(
      () => getFieldConstraints({ type, autoComplete, multiline }),
      [type, autoComplete, multiline],
    )
    const mask = useMemo(() => IMask.createMask(constraints), [constraints])
    const phoneMaskRef = useRef(null)
    const scrollableNodeRef = useRef(null)
    const scrollSpaceRef = useRef(null)
    const textareaAnimationFrameRef = useRef(null)
    useImperativeHandle(forwardedRef, () => controlRef.current, [])
    useEffect(() => {
      if (!isFocused) return
      const syncFocus = () => {
        queueMicrotask(() => {
          if (document.hasFocus() && document.activeElement !== controlRef.current) setIsFocused(false)
        })
      }
      window.addEventListener('focus', syncFocus)
      document.addEventListener('focusin', syncFocus)
      return () => {
        window.removeEventListener('focus', syncFocus)
        document.removeEventListener('focusin', syncFocus)
      }
    }, [isFocused])
    useEffect(() => {
      const control = controlRef.current
      if (!control || type !== 'tel') return
      const phoneMask = IMask(control, constraints)
      phoneMaskRef.current = phoneMask
      return () => {
        phoneMask.destroy()
        phoneMaskRef.current = null
      }
    }, [constraints, type])
    useEffect(() => {
      if (phoneMaskRef.current && value !== undefined) phoneMaskRef.current.value = String(value)
    }, [value])
    useEffect(() => {
      const phoneMask = phoneMaskRef.current
      const control = controlRef.current
      if (!phoneMask || !control) return
      phoneMask.updateOptions({ lazy: !isFocused })
      if (isFocused) phoneMask.alignCursor()
      else if (phoneMask.unmaskedValue.replace(/^1/, '') === '') phoneMask.value = ''
      control.setCustomValidity(getFieldValidationMessage(control, phoneMask.masked))
    }, [constraints, isFocused])

    const validateControl = (control) => {
      control.setCustomValidity('')
      if (type !== 'tel') mask.resolve(control.value)
      control.setCustomValidity(getFieldValidationMessage(control, phoneMaskRef.current?.masked ?? mask))
    }

    const handleChange = (event) => {
      const control = event.currentTarget
      control.setCustomValidity('')
      if (type !== 'tel') {
        const original = control.value
        const cursor = control.selectionStart
        let nextCursor = cursor
        if (cursor !== null) {
          mask.resolve(original.slice(0, cursor))
          nextCursor = mask.value.length
        }
        mask.resolve(original)
        if (original !== mask.value) {
          control.value = mask.value
          if (cursor !== null) control.setSelectionRange(nextCursor, nextCursor)
        }
      }
      validateControl(control)
      onChange?.(event)
    }

    const updateTextareaSize = useCallback(() => {
      const control = controlRef.current
      const root = rootRef.current
      const scrollSpace = scrollSpaceRef.current
      if (!multiline || !control || !root || !scrollSpace) return
      const rootFontSize = Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16
      scrollSpace.style.blockSize = ptrm(Math.max(control.scrollHeight, root.clientHeight), rootFontSize)
    }, [multiline])
    const scheduleTextareaUpdate = useCallback(() => {
      if (textareaAnimationFrameRef.current !== null) window.cancelAnimationFrame(textareaAnimationFrameRef.current)
      textareaAnimationFrameRef.current = window.requestAnimationFrame(updateTextareaSize)
    }, [updateTextareaSize])
    useEffect(() => {
      const control = controlRef.current
      const scrollableNode = scrollableNodeRef.current
      const simpleBarRoot = rootRef.current?.querySelector('.custom-field__scrollbar')
      if (!control) return
      const handleControlScroll = () => {
        if (multiline) setIsScrolled(control.scrollTop > 0)
        // A scrollbar drag owns the scroll position until its next scroll event.
        if (simpleBarRoot?.classList.contains('simplebar-dragging')) return
        if (!scrollableNode) return
        const maxControlScroll = control.scrollHeight - control.clientHeight
        const maxBarScroll = scrollableNode.scrollHeight - scrollableNode.clientHeight
        const nextScroll = maxControlScroll > 0 ? (control.scrollTop / maxControlScroll) * maxBarScroll : 0
        if (Math.abs(scrollableNode.scrollTop - nextScroll) > 1)
          scrollableNode.scrollTop = Number(nextScroll.toFixed(2))
      }
      const handleSimpleBarScroll = () => {
        if (!scrollableNode) return
        const maxControlScroll = control.scrollHeight - control.clientHeight
        const maxBarScroll = scrollableNode.scrollHeight - scrollableNode.clientHeight
        const nextScroll = maxBarScroll > 0 ? (scrollableNode.scrollTop / maxBarScroll) * maxControlScroll : 0
        if (Math.abs(control.scrollTop - nextScroll) > 1) control.scrollTop = Number(nextScroll.toFixed(2))
      }
      control.addEventListener('input', scheduleTextareaUpdate)
      control.addEventListener('scroll', handleControlScroll)
      scrollableNode?.addEventListener('scroll', handleSimpleBarScroll)
      const resizeObserver = new ResizeObserver(scheduleTextareaUpdate)
      if (rootRef.current) resizeObserver.observe(rootRef.current)
      if (multiline) resizeObserver.observe(control)
      scheduleTextareaUpdate()
      return () => {
        control.removeEventListener('input', scheduleTextareaUpdate)
        control.removeEventListener('scroll', handleControlScroll)
        scrollableNode?.removeEventListener('scroll', handleSimpleBarScroll)
        resizeObserver.disconnect()
        if (textareaAnimationFrameRef.current !== null) window.cancelAnimationFrame(textareaAnimationFrameRef.current)
      }
    }, [multiline, scheduleTextareaUpdate])
    useEffect(() => {
      if (multiline) scheduleTextareaUpdate()
    }, [multiline, scheduleTextareaUpdate, value])
    const setControlRef = useCallback((node) => {
      controlRef.current = node
    }, [])
    const commonProps = {
      ...controlProps,
      'aria-describedby':
        [descriptionId, controlProps['aria-describedby'], error && `${controlProps.id}-error`]
          .filter(Boolean)
          .join(' ') || undefined,
      'aria-invalid': error ? true : controlProps['aria-invalid'],
      'aria-required': required ? 'true' : undefined,
      disabled,
      onChange: handleChange,
      onBlur: (event) => {
        const nextTarget = event.relatedTarget
        queueMicrotask(() => {
          if (nextTarget || document.hasFocus()) setIsFocused(false)
        })
        validateControl(event.currentTarget)
        onBlur?.(event)
      },
      onInvalid: (event) => {
        validateControl(event.currentTarget)
      },
      onFocus: (event) => {
        setIsFocused(true)
        onFocus?.(event)
      },
      onPointerDown: (event) => {
        caretPointerRef.current = event.clientX
        controlProps.onPointerDown?.(event)
      },
      autoCapitalize: type === 'email' ? 'none' : undefined,
      spellCheck: type === 'email' ? false : undefined,
      placeholder: ' ',
      readOnly,
      ref: setControlRef,
      required,
      value,
    }
    const multilineStyle = multiline ? { blockSize: ptrm(Math.max(rows, 3) * 24 + 34) } : undefined
    return (
      <div
        className={clsx(
          className,
          'custom-field',
          multiline && 'custom-field--multiline',
          isFocused && 'custom-field--focused',
          isScrolled && 'custom-field--scrolled',
          (error || controlProps['aria-invalid'] === true || controlProps['aria-invalid'] === 'true') &&
            'custom-field--invalid',
          value !== undefined && value !== '' && 'custom-field--filled',
        )}
      >
        <div className="custom-field__inner" ref={rootRef} style={multilineStyle}>
          {multiline ? (
            <>
              <Scroll className="custom-field__scrollbar" scrollRef={scrollableNodeRef} aria-hidden="true">
                <span className="custom-field__space" ref={scrollSpaceRef} />
              </Scroll>
              <textarea
                className={clsx(controlClassName, 'custom-field__control')}
                rows={rows}
                inputMode={inputMode}
                name={name}
                autoComplete={autoComplete}
                {...commonProps}
              />
            </>
          ) : (
            <input
              className={clsx(controlClassName, 'custom-field__control')}
              type={type}
              inputMode={inputMode}
              name={name}
              autoComplete={autoComplete}
              {...commonProps}
            />
          )}
          {label || placeholder ? (
            <label className={clsx(labelClassName, 'custom-field__label')} htmlFor={controlProps.id}>
              <span className="custom-field__label-text">{label || placeholder}</span>
              {required && !disabled && !readOnly ? (
                <span className="custom-field__required" aria-hidden="true">
                  *
                </span>
              ) : null}
            </label>
          ) : null}
          {isFocused && !disabled && !readOnly && (
            <CustomCaret controlRef={controlRef} fieldRef={rootRef} initialPointerRef={caretPointerRef} />
          )}
        </div>
        {error && (
          <p className="custom-field__error" id={`${controlProps.id}-error`}>
            {error}
          </p>
        )}
      </div>
    )
  }),
)
