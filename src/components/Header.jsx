import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { nav, company } from '../data/site'
import ThemeToggle from './ThemeToggle'
import ThemePicker from './ThemePicker'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const close = () => {
    setMobileOpen(false)
    setMobileExpanded(null)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-okrr-cloud/95 dark:bg-dark-bg/95 backdrop-blur-sm border-b border-okrr-nimbus/30 dark:border-dark-border">
        <div className="mx-auto flex h-16 max-w-container items-center justify-between section-x">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-black tracking-widest text-neutral-900 dark:text-okrr-cloud uppercase"
          >
            {company.name}
          </Link>

          {/* Desktop nav — each <li> is position:relative so dropdown is anchored to it */}
          <ul
            className="hidden items-stretch lg:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {nav.map((item) => (
              <li
                key={item.label}
                className="relative flex items-center"
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

                {/* Dropdown — left:0 aligns with <li> edge; items inside use pl-5 (= NavLink px-5)
                    so text starts exactly under the first letter of the parent menu item */}
                {hovered === item.label && item.children.length > 0 && (
                  <div className="absolute left-0 top-full z-50 w-max">
                    {/* Top accent line connects to the header bottom border */}
                    <div className="h-px bg-neutral-900 dark:bg-okrr-cloud w-full" />
                    <ul className="flex flex-col gap-0 bg-okrr-cloud/98 dark:bg-dark-bg/98 backdrop-blur-sm border-x border-b border-okrr-nimbus/30 dark:border-dark-border shadow-sm py-3">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link
                            to={c.to}
                            className="block whitespace-nowrap pl-5 pr-8 py-2 text-sm text-neutral-500 dark:text-dark-muted transition hover:text-neutral-900 dark:hover:text-okrr-cloud hover:bg-black/[.03] dark:hover:bg-white/[.03]"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <ThemePicker />
            <ThemeToggle />
            {/* Auth button — desktop */}
            {user ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden lg:block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 border border-okrr-nimbus/50 dark:border-dark-border rounded text-neutral-500 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud hover:border-neutral-900 dark:hover:border-okrr-cloud transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden lg:block text-xs font-semibold tracking-widest uppercase px-3 py-1.5 border border-okrr-nimbus/50 dark:border-dark-border rounded text-neutral-500 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud hover:border-neutral-900 dark:hover:border-okrr-cloud transition-colors"
              >
                Login
              </Link>
            )}
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
            {/* Auth — mobile */}
            <div className="p-4 border-t border-okrr-nimbus/20 dark:border-dark-border">
              {user ? (
                <button
                  type="button"
                  onClick={() => { handleSignOut(); close() }}
                  className="w-full text-sm font-semibold text-neutral-500 dark:text-dark-muted py-2 text-left hover:text-neutral-900 dark:hover:text-okrr-cloud transition-colors"
                >
                  로그아웃
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={close}
                  className="block text-sm font-semibold text-neutral-900 dark:text-okrr-cloud py-2"
                >
                  로그인 / 회원가입
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
