import { useEffect, useState } from 'react'

export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('okrr-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('okrr-theme', 'light')
    }
  }, [dark])

  return (
    <button
      type="button"
      aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      onClick={() => setDark((d) => !d)}
      className={[
        'flex h-9 w-16 items-center rounded-full border p-1 transition-colors',
        dark
          ? 'border-dark-border bg-dark-surface'
          : 'border-okrr-nimbus bg-white',
        className,
      ].join(' ')}
    >
      <span
        className={[
          'flex h-6 w-6 items-center justify-center rounded-full text-sm transition-transform duration-300',
          dark
            ? 'translate-x-7 bg-okrr-cloud text-neutral-900'
            : 'translate-x-0 bg-neutral-900 text-white',
        ].join(' ')}
      >
        {dark ? '☀' : '☾'}
      </span>
    </button>
  )
}
