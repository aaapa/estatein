import clsx from 'clsx'
import { forwardRef, useEffect, useId, useLayoutEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Scroll } from '@/shared/ui/Scroll'
import { Icon } from '@/shared/ui/Icon'
import { ptrm } from '@/shared/lib/dom/ptrm'
import { getRootFontSize } from '@/shared/lib/dom/getRootFontSize'
import './CustomSelect.scss'

const normalizeValue = (value) => {
  if (Array.isArray(value)) return value.map(String)
  if (value === undefined || value === null) return []
  return [String(value)]
}

const findEnabledIndex = (options, startIndex, direction) => {
  let index = startIndex
  while (index >= 0 && index < options.length) {
    if (!options[index]?.disabled) return index
    index += direction
  }
  return -1
}

export const CustomSelect = forwardRef(function CustomSelect(
  {
    className,
    id,
    name,
    options: suppliedOptions = [],
    value,
    defaultValue,
    multiple = false,
    disabled = false,
    required = false,
    error = '',
    label = 'Выбор значения',
    labelHidden = true,
    icon,
    variant,
    rootStyle,
    onChange,
    onBlur,
    onFocus,
    'aria-describedby': descriptionIdentifier,
    'aria-invalid': ariaInvalid,
    'data-autofocus': dataAutofocus,
    ...buttonProps
  },
  forwardedReference,
) {
  const generatedIdentifier = useId()
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()
  const controlIdentifier = id ?? `custom-select-${generatedIdentifier}`
  const labelIdentifier = `${controlIdentifier}-label`
  const selectedIdentifier = `${controlIdentifier}-selected`
  const listIdentifier = `${controlIdentifier}-list`
  const optionIdentifier = (index) => `${controlIdentifier}-option-${index + 1}`
  const rootReference = useRef(null)
  const triggerReference = useRef(null)
  const contentReference = useRef(null)
  const optionReferences = useRef([])
  const typeaheadReference = useRef({ text: '', time: 0 })
  const [contentStyle, setContentStyle] = useState({})
  const options = useMemo(
    () =>
      suppliedOptions.map((option) => ({
        ...option,
        value: String(option.value),
        text: String(option.label),
      })),
    [suppliedOptions],
  )
  const isControlled = value !== undefined
  const [uncontrolledValues, setUncontrolledValues] = useState(() =>
    normalizeValue(defaultValue ?? (multiple ? [] : options.find((option) => !option.disabled)?.value)),
  )
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const selectedValues = normalizeValue(isControlled ? value : uncontrolledValues).filter((selectedValue) =>
    options.some((option) => option.value === selectedValue),
  )
  const selectedIndexes = options.reduce((indexes, option, index) => {
    if (selectedValues.includes(option.value)) indexes.push(index)
    return indexes
  }, [])
  const selectedIndex = selectedIndexes[0] ?? -1
  const selectedText = selectedIndexes.map((index) => options[index].text).join(', ') || 'Выберите значение'
  const formValues = selectedValues.filter((selectedValue) =>
    options.some((option) => option.value === selectedValue && !option.disabled),
  )

  useImperativeHandle(forwardedReference, () => triggerReference.current)

  const close = (restoreFocus = false) => {
    setIsOpen(false)
    typeaheadReference.current = { text: '', time: 0 }
    if (restoreFocus) triggerReference.current?.focus()
  }

  const open = (preferredIndex = selectedIndex) => {
    if (disabled || options.length === 0) return
    const index =
      preferredIndex >= 0 && !options[preferredIndex]?.disabled ? preferredIndex : findEnabledIndex(options, 0, 1)
    setActiveIndex(index)
    setIsOpen(true)
  }

  const selectOption = (option) => {
    if (!option || option.disabled || disabled) return
    const nextValues = multiple
      ? selectedValues.includes(option.value)
        ? selectedValues.filter((selectedValue) => selectedValue !== option.value)
        : [...selectedValues, option.value]
      : [option.value]
    if (!isControlled) setUncontrolledValues(nextValues)
    onChange?.(multiple ? nextValues : nextValues[0])
    if (!multiple) close(true)
  }

  const handleButtonKeyDown = (event) => {
    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      event.stopPropagation()
      close()
      return
    }
    if (event.key === 'Tab') {
      if (isOpen) close()
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (isOpen) selectOption(options[activeIndex])
      else open()
      return
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      const lastIndex = options.length - 1
      const index =
        event.key === 'Home'
          ? findEnabledIndex(options, 0, 1)
          : event.key === 'End'
            ? findEnabledIndex(options, lastIndex, -1)
            : !isOpen
              ? selectedIndex >= 0
                ? selectedIndex
                : findEnabledIndex(options, event.key === 'ArrowUp' ? lastIndex : 0, event.key === 'ArrowUp' ? -1 : 1)
              : findEnabledIndex(
                  options,
                  activeIndex + (event.key === 'ArrowUp' ? -1 : 1),
                  event.key === 'ArrowUp' ? -1 : 1,
                )
      if (index >= 0) {
        setActiveIndex(index)
        setIsOpen(true)
      }
      return
    }
    if (event.key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) return
    event.preventDefault()
    const previous = typeaheadReference.current
    const time = Date.now()
    const text = (time - previous.time < 700 ? previous.text : '') + event.key.toLocaleLowerCase('ru')
    typeaheadReference.current = { text, time }
    const query = [...text].every((letter) => letter === text[0]) ? text[0] : text
    const startIndex = isOpen ? activeIndex : selectedIndex
    const indexes = options.map((_, index) => (Math.max(startIndex, -1) + index + 1) % options.length)
    const index = indexes.find(
      (index) => !options[index].disabled && options[index].text.toLocaleLowerCase('ru').startsWith(query),
    )
    if (index !== undefined) {
      setActiveIndex(index)
      setIsOpen(true)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const handleOutsidePointerDown = (event) => {
      if (!rootReference.current?.contains(event.target)) close()
    }
    document.addEventListener('pointerdown', handleOutsidePointerDown)
    return () => document.removeEventListener('pointerdown', handleOutsidePointerDown)
  }, [isOpen])

  useEffect(() => {
    if (disabled && isOpen) close()
  }, [disabled, isOpen])
  useLayoutEffect(() => {
    if (!isOpen || !contentReference.current) return
    const content = contentReference.current
    content.showPopover()
    const updatePosition = () => {
      const trigger = rootReference.current?.querySelector('[role="combobox"]')
      if (!trigger) return
      const root = getRootFontSize()
      const viewport = window.visualViewport
      const safeInset = root / 2
      const panelGap = (root * 7) / 16
      const left = (viewport?.offsetLeft ?? 0) + safeInset
      const top = (viewport?.offsetTop ?? 0) + safeInset
      const width = Math.max(0, (viewport?.width ?? innerWidth) - safeInset * 2)
      const height = Math.max(0, (viewport?.height ?? innerHeight) - safeInset * 2)
      const anchor = trigger.getBoundingClientRect()
      const panelWidth = Math.min(anchor.width, width)
      content.style.inlineSize = ptrm(panelWidth, root)
      const optionsList = content.querySelector('.select__options')
      const naturalHeight = (optionsList?.scrollHeight ?? content.scrollHeight) + 2
      const below = Math.max(0, top + height - anchor.bottom - panelGap)
      const above = Math.max(0, anchor.top - top - panelGap)
      const maxPanelHeight = (root * 280) / 16
      const openBelow = below >= Math.min(maxPanelHeight, naturalHeight) || below >= above
      const available = Math.min(maxPanelHeight, openBelow ? below : above)
      const panelHeight = Math.min(naturalHeight, available)
      setContentStyle({
        inlineSize: ptrm(panelWidth, root),
        maxBlockSize: ptrm(available, root),
        insetInlineStart: ptrm(Math.max(left, Math.min(anchor.left, left + width - panelWidth)), root),
        insetBlockStart: ptrm(
          Math.max(
            top,
            Math.min(
              openBelow ? anchor.bottom + panelGap : anchor.top - panelHeight - panelGap,
              top + height - panelHeight,
            ),
          ),
          root,
        ),
      })
    }
    updatePosition()
    const observer = new ResizeObserver(updatePosition)
    if (rootReference.current) observer.observe(rootReference.current)
    const optionsList = content.querySelector('.select__options')
    if (optionsList) observer.observe(optionsList)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    window.visualViewport?.addEventListener('resize', updatePosition)
    window.visualViewport?.addEventListener('scroll', updatePosition)
    return () => {
      if (content.matches(':popover-open')) content.hidePopover()
      observer.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      window.visualViewport?.removeEventListener('resize', updatePosition)
      window.visualViewport?.removeEventListener('scroll', updatePosition)
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen) return
    const option = optionReferences.current[activeIndex]
    const scroll = contentReference.current?.querySelector('.simplebar-content-wrapper')
    if (!option || !scroll) return
    const optionRect = option.getBoundingClientRect()
    const scrollRect = scroll.getBoundingClientRect()
    if (optionRect.top < scrollRect.top) scroll.scrollTop += optionRect.top - scrollRect.top
    else if (optionRect.bottom > scrollRect.bottom) scroll.scrollTop += optionRect.bottom - scrollRect.bottom
  }, [activeIndex, isOpen, contentStyle])

  return (
    <div
      className={clsx(
        className,
        'select',
        variant && `select--${variant}`,
        isOpen && 'select--open',
        disabled && 'select--disabled',
      )}
      style={rootStyle}
      ref={rootReference}
    >
      <span className={clsx('select__label', labelHidden && 'visually-hidden')} id={labelIdentifier}>
        {label}
        {required && !disabled && (
          <span className="select__required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>
      {(multiple ? formValues : [formValues[0] ?? '']).map((selectedValue, index) => (
        <input
          className="select__input"
          type="hidden"
          name={name}
          value={selectedValue}
          disabled={disabled}
          key={index}
        />
      ))}
      <button
        className="select__selected"
        {...buttonProps}
        id={controlIdentifier}
        role="combobox"
        disabled={disabled}
        value={formValues.find((selectedValue) => selectedValue !== '') ?? ''}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listIdentifier : undefined}
        aria-activedescendant={isOpen && activeIndex >= 0 ? optionIdentifier(activeIndex) : undefined}
        aria-labelledby={`${labelIdentifier} ${selectedIdentifier}`}
        aria-describedby={
          [descriptionIdentifier, error && `${controlIdentifier}-error`].filter(Boolean).join(' ') || undefined
        }
        aria-invalid={error ? true : ariaInvalid}
        aria-required={required || undefined}
        data-autofocus={dataAutofocus}
        ref={triggerReference}
        onBlur={(event) => {
          if (!rootReference.current?.contains(event.relatedTarget)) close()
          onBlur?.(event)
        }}
        onFocus={onFocus}
        onClick={(event) => {
          event.preventDefault()
          if (isOpen) close()
          else open()
        }}
        onKeyDown={handleButtonKeyDown}
      >
        {icon && <Icon className="select__icon" name={icon} width="24" height="24" />}
        <span className="select__selected-text" id={selectedIdentifier}>
          {selectedText}
        </span>
        {required && labelHidden && !disabled && (
          <span className="select__required" aria-hidden="true">
            *
          </span>
        )}
        <Icon className="select__chevron" name="chevron-down" width="20" height="20" />
      </button>
      {error && (
        <p className="select__error" id={`${controlIdentifier}-error`}>
          {error}
        </p>
      )}
      {isOpen && (
        <div className="select__content" ref={contentReference} style={contentStyle} popover="manual">
          <Scroll className="select__scroll" style={{ maxBlockSize: contentStyle.maxBlockSize }}>
            <ul
              className="select__options"
              id={listIdentifier}
              role="listbox"
              aria-labelledby={labelIdentifier}
              aria-multiselectable={multiple || undefined}
            >
              {options.map((option, index) => (
                <li
                  className={clsx(
                    'select__option',
                    selectedValues.includes(option.value) && 'select__option--selected',
                    isOpen && index === activeIndex && 'select__option--highlighted',
                    option.disabled && 'select__option--disabled',
                  )}
                  id={optionIdentifier(index)}
                  role="option"
                  aria-selected={selectedValues.includes(option.value)}
                  aria-disabled={option.disabled || undefined}
                  ref={(node) => {
                    optionReferences.current[index] = node
                  }}
                  onPointerDown={(event) => event.preventDefault()}
                  onPointerMove={() => {
                    if (!option.disabled) setActiveIndex(index)
                  }}
                  onClick={() => selectOption(option)}
                  key={option.value}
                >
                  <span className="select__text">{option.label}</span>
                </li>
              ))}
            </ul>
          </Scroll>
        </div>
      )}
    </div>
  )
})
