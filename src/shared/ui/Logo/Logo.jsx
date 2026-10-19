import { Link } from 'react-router'
import { Icon } from '@/shared/ui/Icon'
import './Logo.scss'
import clsx from 'clsx'

export function Logo({ className = '' }) {
  return (
    <Link className={clsx(className, 'logo')} to="/">
      <span className="logo__label visually-hidden">Estatein — на главную</span>
      <Icon name="logo-symbol" width="48" height="48" />
      <Icon name="logo-wordmark" width="101.77" height="20.52" />
    </Link>
  )
}
