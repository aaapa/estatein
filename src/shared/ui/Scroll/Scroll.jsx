import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { ScrollBar } from './ScrollBar'

export function Scroll({ className, children, scrollRef, viewportStyle, handlers, labelledBy, ...props }) {
  const rootRef = useRef(null)
  const viewportRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const scrollbar = new ScrollBar(rootRef.current, {
      autoHide: true,
      scrollableNode: viewportRef.current,
      contentNode: contentRef.current,
    })
    return () => scrollbar.unMount()
  }, [])

  return (
    <div className={clsx(className)} ref={rootRef} data-simplebar="init" {...props}>
      <div className="simplebar-wrapper">
        <div className="simplebar-height-auto-observer-wrapper">
          <div className="simplebar-height-auto-observer" />
        </div>
        <div className="simplebar-mask">
          <div className="simplebar-offset">
            <div
              className="simplebar-content-wrapper"
              ref={(node) => {
                viewportRef.current = node
                if (scrollRef) scrollRef.current = node
              }}
              style={viewportStyle}
              aria-labelledby={labelledBy}
              {...handlers}
            >
              <div className="simplebar-content" ref={contentRef}>
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="simplebar-placeholder" />
      </div>
      <div className="simplebar-track simplebar-horizontal">
        <div className="simplebar-scrollbar" />
      </div>
      <div className="simplebar-track simplebar-vertical">
        <div className="simplebar-scrollbar" />
      </div>
    </div>
  )
}
