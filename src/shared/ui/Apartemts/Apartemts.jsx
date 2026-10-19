import { Icon } from '@/shared/ui/Icon'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import clsx from 'clsx'
import { Scroll } from '@/shared/ui/Scroll'
import { IconActionButton } from '@/shared/ui/IconActionButton'
import { useHorizontalDrag } from '@/shared/lib/scroll/useHorizontalDrag'

export function Apartemts({
  block,
  name,
  items,
  renderItem,
  action,
  onShowAll,
  sliderRef,
  onPositionChange,
  indicators = 0,
}) {
  const element = (name = '') => `${block}__slider${name ? `-${name}` : ''}`
  const listId = element('slides').replace('__', '-')
  const listRef = useRef(null)
  const scrollRef = useRef(null)
  const [position, setPosition] = useState({
    index: 0,
    current: 1,
    lastIndex: items.length - 1,
    canPrevious: false,
    canNext: false,
  })
  const indicatorCount = Math.min(indicators, position.lastIndex + 1)
  const indicatorPositions = Array.from({ length: indicatorCount }, (_, index) =>
    Math.round((index * position.lastIndex) / Math.max(1, indicatorCount - 1)),
  )
  const activeIndicator = indicatorPositions.reduce(
    (nearest, index, current) =>
      Math.abs(index - position.index) < Math.abs(indicatorPositions[nearest] - position.index) ? current : nearest,
    0,
  )

  const getStride = () => {
    const list = listRef.current
    return list.children[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(list).columnGap) || 0)
  }

  const moveTo = (index) => {
    const scroll = scrollRef.current
    scroll.scrollTo({
      left: Number(Math.max(0, Math.min(index * getStride(), scroll.scrollWidth - scroll.clientWidth)).toFixed(2)),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  useImperativeHandle(sliderRef, () => ({ moveTo }))

  const { isDragging, handlers } = useHorizontalDrag(scrollRef, () => {
    moveTo(Math.round(scrollRef.current.scrollLeft / getStride()))
  })

  useEffect(() => {
    const scroll = scrollRef.current
    const list = listRef.current
    const updatePosition = () => {
      const stride =
        list.children[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(list).columnGap) || 0)
      const index = Math.round(scroll.scrollLeft / stride)
      const canNext = scroll.scrollLeft < scroll.scrollWidth - scroll.clientWidth - 1
      const next = {
        index,
        lastIndex: Math.round((scroll.scrollWidth - scroll.clientWidth) / stride),
        current: canNext ? index + 1 : items.length,
        canPrevious: scroll.scrollLeft > 1,
        canNext,
      }
      onPositionChange?.(index)
      setPosition((previous) =>
        previous.index === next.index &&
        previous.lastIndex === next.lastIndex &&
        previous.current === next.current &&
        previous.canPrevious === next.canPrevious &&
        previous.canNext === next.canNext
          ? previous
          : next,
      )
    }
    updatePosition()
    scroll.addEventListener('scroll', updatePosition, { passive: true })
    const observer = new ResizeObserver(updatePosition)
    observer.observe(scroll)
    observer.observe(list)
    return () => {
      observer.disconnect()
      scroll.removeEventListener('scroll', updatePosition)
    }
  }, [items, onPositionChange])

  return (
    <div className={clsx(element(), isDragging && `${element()}--dragging`)}>
      <Scroll scrollRef={scrollRef} handlers={handlers}>
        <ul className={clsx(element('slides'))} id={listId} ref={listRef}>
          {items.map((item) => (
            <li className={clsx(element('slide'))} key={item.id}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </Scroll>
      <div className={clsx(element('controls'))}>
        {!indicators && (
          <span className={clsx(element('position'))} aria-live="polite" aria-atomic="true">
            <span className={clsx(element('position-current'))}>{String(position.current).padStart(2, '0')}</span> из{' '}
            {String(items.length).padStart(2, '0')}
          </span>
        )}
        {action && (
          <button className={clsx(element('all-button'))} onClick={onShowAll}>
            {action}
          </button>
        )}
        <ul className={clsx(element('actions'))}>
          <li className={clsx(element('action'))}>
            <IconActionButton
              className={clsx(element('previous-button'))}
              label={`${name}: назад`}
              aria-controls={listId}
              disabled={!position.canPrevious}
              onClick={() => moveTo(position.index - 1)}
            >
              <Icon name="arrow-left" width="30" height="30" />
            </IconActionButton>
          </li>
          {indicators ? (
            <li className={clsx(element('action'), `${element('action')}--indicators`)}>
              <ul className={clsx(element('indicators'))}>
                {indicatorPositions.map((target, index) => (
                  <li className={clsx(element('indicator'))} key={target}>
                    <IconActionButton
                      className={clsx(
                        element('indicator-button'),
                        index === activeIndicator && `${element('indicator-button')}--active`,
                      )}
                      label={`${name}: группа ${index + 1} из ${indicatorCount}`}
                      aria-controls={listId}
                      aria-current={index === activeIndicator ? 'true' : undefined}
                      onClick={() => moveTo(target)}
                    >
                      <span className={clsx(element('indicator-line'))} aria-hidden="true" />
                    </IconActionButton>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li className={clsx(element('action'), `${element('action')}--position`)}>
              <span className={clsx(element('mobile-position'))}>
                {String(position.current).padStart(2, '0')} из {String(items.length).padStart(2, '0')}
              </span>
            </li>
          )}
          <li className={clsx(element('action'))}>
            <IconActionButton
              className={clsx(element('next-button'))}
              label={`${name}: дальше`}
              aria-controls={listId}
              disabled={!position.canNext}
              onClick={() => moveTo(position.index + 1)}
            >
              <Icon name="arrow-right" width="30" height="30" />
            </IconActionButton>
          </li>
        </ul>
      </div>
    </div>
  )
}
