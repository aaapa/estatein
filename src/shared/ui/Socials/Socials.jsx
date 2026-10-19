import clsx from 'clsx'
import { IconActionButton } from '@/shared/ui/IconActionButton'
import { Icon } from '@/shared/ui/Icon'
import './Socials.scss'

const links = [
  { icon: 'facebook', name: 'Facebook', href: 'https://www.facebook.com/' },
  { icon: 'linked-in', name: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { icon: 'twitter', name: 'X', href: 'https://x.com/' },
  { icon: 'youtube', name: 'YouTube', href: 'https://www.youtube.com/' },
]

export function Socials({ className, variant, items = links }) {
  return (
    <div className={clsx(className, 'socials', variant && `socials--${variant}`)}>
      <span className="socials__title visually-hidden">Мы в социальных сетях</span>
      <nav className="socials__nav">
        <ul className="socials__list">
          {items.map(({ icon, name, href }) => (
            <li className="socials__item" key={name}>
              {variant === 'text' ? (
                <a className="socials__link" href={href} target="_blank" rel="noreferrer">
                  {name}
                  <span className="visually-hidden"> — откроется в новой вкладке</span>
                </a>
              ) : (
                <IconActionButton
                  className="socials__link"
                  label={`${name}, откроется в новой вкладке`}
                  tooltip={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name={icon} />
                </IconActionButton>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
