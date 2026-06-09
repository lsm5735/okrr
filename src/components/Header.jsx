import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, company } from '../data/site'
import ThemeToggle from './ThemeToggle'
import ThemePicker from './ThemePicker'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)

  const close = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="bg-okrr-cloud/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-okrr-nimbus/30 dark:border-dark-border"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="mx-auto flex h-16 max-w-container items-center justify-between section-x">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-black tracking-widest text-neutral-900 dark:text-okrr-cloud uppercase"
          >
            {company.name}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="flex items-center"
                onMouseEnter={() => setHovered(item.label)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-5 text-sm font-semibold tracking-wide transition-colors',
                      isActive
                        ? 'text-neutral-900 dark:text-okrr-cloud'
                        : 'text-neutral-500 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemePicker />
            <ThemeToggle />
            {/* Hamburger */}
            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex flex-col items-center justify-center gap-1.5 lg:hidden p-2"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-5 bg-neutral-800 dark:bg-okrr-cloud" />
              <span className="h-0.5 w-5 bg-neutral-800 dark:bg-okrr-cloud" />
              <span className="h-0.5 w-5 bg-neutral-800 dark:bg-okrr-cloud" />
            </button>
          </div>
        </div>

        {/* Desktop mega submenu — mirrors header justify-between so columns sit under the correct nav items */}
        <div
          className={[
            'hidden border-t border-okrr-nimbus/20 dark:border-dark-border bg-okrr-cloud/95 dark:bg-dark-bg/95 backdrop-blur-sm overflow-hidden transition-all duration-200 lg:block',
            hovered ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0 border-t-0',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-container items-start justify-between section-x">
            {/* Logo spacer — same markup as the real logo to match its width */}
            <span className="invisible text-xl font-black tracking-widest">{company.name}</span>

            {/* Sub-columns — one per nav item, each same width as the nav link above */}
            <ul className="flex">
              {nav.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => setHovered(item.label)}
                  className="flex flex-col gap-2 py-5"
                  style={{ minWidth: '0', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}
                >
                  {hovered === item.label &&
                    item.children.map((c) => (
                      <Link
                        key={c.label + c.to}
                        to={c.to}
                        className="block whitespace-nowrap text-sm text-neutral-500 dark:text-dark-muted transition hover:text-neutral-900 dark:hover:text-okrr-cloud hover:font-semibold"
                      >
                        {c.label}
                      </Link>
                    ))}
                </li>
              ))}
            </ul>

            {/* Controls spacer */}
            <div className="invisible flex items-center gap-2">
              <ThemePicker />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-xs overflow-y-auto bg-okrr-cloud dark:bg-dark-bg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-okrr-nimbus/30 dark:border-dark-border">
              <span className="text-base font-black tracking-widest text-neutral-900 dark:text-okrr-cloud uppercase">
                {company.name}
              </span>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className="text-xl text-neutral-500 dark:text-dark-muted"
                onClick={close}
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-between px-5 py-4 border-b border-okrr-nimbus/20 dark:border-dark-border">
              <span className="text-xs text-neutral-500 dark:text-dark-muted">테마 전환</span>
              <ThemeToggle />
            </div>
            <ul className="flex flex-col p-4">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-okrr-nimbus/20 dark:border-dark-border last:border-b-0">
                  {item.children.length > 0 ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-base font-bold text-neutral-900 dark:text-okrr-cloud"
                        onClick={() =>
                          setMobileExpanded((e) => (e === item.label ? null : item.label))
                        }
                      >
                        {item.label}
                        <span className="text-sm text-neutral-400">
                          {mobileExpanded === item.label ? '−' : '+'}
                        </span>
                      </button>
                      {mobileExpanded === item.label && (
                        <ul className="mb-3 flex flex-col gap-1 pl-3">
                          {item.children.map((c) => (
                            <li key={c.to}>
                              <Link
                                to={c.to}
                                className="block py-2 text-sm text-neutral-500 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud"
                                onClick={close}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.to}
                      className="block py-4 text-base font-bold text-neutral-900 dark:text-okrr-cloud"
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
