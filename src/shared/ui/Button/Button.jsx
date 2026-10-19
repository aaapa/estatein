import './Button.scss'
import { Link } from 'react-router'
import clsx from 'clsx'

export function Button({ children, href, className = '', variant = 'default', ...props }) {
  const Component = href?.startsWith('/') ? Link : href ? 'a' : 'button'
  return (
    <Component
      className={clsx(className, 'button', `button--${variant}`)}
      {...(href ? (href.startsWith('/') ? { to: href } : { href }) : {})}
      {...props}
    >
      {children}
    </Component>
  )
}
