import clsx from 'clsx'
import { Tippy } from '@/shared/ui/Tippy'
import './MenuButton.scss'

export function MenuButton({ ref, controls, isOpen, onClick }) {
  const label = isOpen ? 'Закрыть меню' : 'Открыть меню'
  return (
    <Tippy content={label}>
      <button className="menu-button" ref={ref} aria-controls={controls} aria-expanded={isOpen} onClick={onClick}>
        <span className={clsx('menu-button__icon', isOpen && 'menu-button__icon--open')} aria-hidden="true">
          <span className="menu-button__icon-line" />
          <span className="menu-button__icon-line" />
          <span className="menu-button__icon-line" />
        </span>
        <span className="menu-button__label visually-hidden">{label}</span>
      </button>
    </Tippy>
  )
}
