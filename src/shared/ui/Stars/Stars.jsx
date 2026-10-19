import { Icon } from '@/shared/ui/Icon'
import clsx from 'clsx'
import './Stars.scss'

export function Stars({ className }) {
  return (
    <span className={clsx(className, 'stars')} aria-hidden="true">
      <Icon name="stars" width="68.4" height="30" />
    </span>
  )
}
