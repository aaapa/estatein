import clsx from 'clsx'
import { Icon } from '@/shared/ui/Icon'
import './Rating.scss'

export function Rating({ className, value = 5, max = 5 }) {
  const rating = Math.min(max, Math.max(0, value))
  return (
    <div className={clsx(className, 'rating')}>
      <span className="rating__label visually-hidden">
        Оценка: {rating} из {max}
      </span>
      <ul className="rating__list" aria-hidden="true">
        {Array.from({ length: max }, (_, index) => (
          <li className={clsx('rating__item', index < rating && 'rating__item--filled')} key={index}>
            <Icon className="rating__icon" name="star" width="24.00" height="24.00" />
          </li>
        ))}
      </ul>
    </div>
  )
}
