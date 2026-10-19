import { Link, useLocation } from 'react-router'
import { Icon } from '@/shared/ui/Icon'
import { MenuButton } from '@/shared/ui/MenuButton'
import { IconActionButton } from '@/shared/ui/IconActionButton'
import { useState } from 'react'
import clsx from 'clsx'
import { Logo } from '@/shared/ui/Logo'
import { Button } from '@/shared/ui/Button'
import { Scroll } from '@/shared/ui/Scroll'
import { useHeaderMenu } from '../model/useHeaderMenu'
import './Header.scss'

const links = [
  { href: '/', label: 'Главная' },
  { href: '/about/', label: 'О нас' },
  { href: '/apartments/', label: 'Недвижимость' },
  { href: '/services/', label: 'Услуги' },
]

export function Header({ ref, headerHeight }) {
  const location = useLocation()
  const currentHref = location.pathname.startsWith('/apartments/') ? '/apartments/' : location.pathname
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true)
  const { isMobile, isMenuOpen, setIsMenuOpen, menuRef, menuButtonRef } = useHeaderMenu()
  const MenuInner = isMobile ? Scroll : 'div'

  return (
    <header className="header" ref={ref}>
      {isAnnouncementVisible && (
        <div className="header__announcement">
          <div className="header__announcement-inner container">
            <p className="header__announcement-text">
              ✨ Ваш новый дом ближе, чем кажется.{' '}
              <Link className="header__announcement-link" to="/apartments/">
                Найти свой
              </Link>
            </p>
            <IconActionButton
              className="header__close-button"
              label="Закрыть объявление"
              onClick={() => setIsAnnouncementVisible(false)}
            >
              <Icon name="close" width="24" height="24" />
            </IconActionButton>
          </div>
        </div>
      )}
      <div className="header__inner container">
        <Logo className="header__logo" />
        <MenuButton
          ref={menuButtonRef}
          isOpen={isMenuOpen}
          controls="header-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <div
          className={clsx('header__menu', isMenuOpen && 'header__menu--open')}
          id="header-menu"
          ref={menuRef}
          style={isMobile ? { insetBlockStart: headerHeight } : undefined}
          inert={isMobile && !isMenuOpen}
          aria-hidden={isMobile && !isMenuOpen ? true : undefined}
        >
          <MenuInner className="header__menu-inner">
            <nav className="header__nav">
              <ul className="header__list">
                {links.map(({ href, label }) => (
                  <li className="header__item" key={href}>
                    <Link
                      className={clsx('header__link', href === currentHref && 'header__link--active')}
                      to={href}
                      aria-current={href === currentHref ? 'page' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="header__item header__item--contact">
                  <Button href="/contacts/" onClick={() => setIsMenuOpen(false)}>
                    Связаться с нами
                  </Button>
                </li>
              </ul>
            </nav>
          </MenuInner>
        </div>
        <Button href="/contacts/" variant="outline">
          Связаться с нами
        </Button>
      </div>
    </header>
  )
}
