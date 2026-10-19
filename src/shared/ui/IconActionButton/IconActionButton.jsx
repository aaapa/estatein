import { Tippy } from '@/shared/ui/Tippy'
import clsx from 'clsx'

export function IconActionButton({ label, tooltip = label, children, className, href, ...props }) {
  const Component = href ? 'a' : 'button'
  return (
    <Tippy content={tooltip}>
      <Component className={clsx(className, 'icon-action-button')} {...(href ? { href } : {})} {...props}>
        {children}
        <span className="icon-action-button__label visually-hidden">{label}</span>
      </Component>
    </Tippy>
  )
}
