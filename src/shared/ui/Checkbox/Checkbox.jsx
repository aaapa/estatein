import clsx from 'clsx'
import './Checkbox.scss'

export function Checkbox({ className, ref, required = false, ...props }) {
  return (
    <input
      className={clsx(className, 'checkbox')}
      ref={ref}
      type="checkbox"
      required={required}
      aria-required={required || undefined}
      {...props}
    />
  )
}
