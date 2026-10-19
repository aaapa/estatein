import { Icon } from '@/shared/ui/Icon'
import { IconActionButton } from '@/shared/ui/IconActionButton'
import { useEffect, useRef } from 'react'
import { Scroll } from '@/shared/ui/Scroll'
import { lockScroll } from '@/shared/lib/scroll/lockScroll'
import './Modal.scss'

export function Modal({ title, children, onClose }) {
  const dialogRef = useRef(null)
  const titleRef = useRef(null)
  useEffect(() => {
    const trigger = document.activeElement
    const dialog = dialogRef.current
    const unlockScroll = lockScroll()
    dialog.showModal()
    titleRef.current?.focus({ preventScroll: true })
    return () => {
      dialog.close()
      unlockScroll()
      if (trigger?.checkVisibility()) trigger.focus()
      else document.querySelector('.menu-button')?.focus()
    }
  }, [])

  return (
    <dialog
      className="modal"
      ref={dialogRef}
      aria-labelledby="modal-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          const rect = dialogRef.current.getBoundingClientRect()
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose()
        }
      }}
    >
      <div className="modal__header">
        <h2 className="modal__title" id="modal-title" ref={titleRef} tabIndex={-1}>
          {title}
        </h2>
        <IconActionButton className="modal__close-button" label="Закрыть окно" onClick={onClose}>
          <Icon name="close" width="24" height="24" />
        </IconActionButton>
      </div>
      <Scroll className="modal__content" labelledBy="modal-title">
        {children}
      </Scroll>
    </dialog>
  )
}
