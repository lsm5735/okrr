import { useState } from 'react'
import { usePalette, palettes } from '../context/ThemeContext'

export default function ThemePicker({ className = '' }) {
  const { palette, setPalette } = usePalette()
  const [open, setOpen] = useState(false)

  return (
    <div className={['relative', className].join(' ')}>
      {/* Trigger — shows the active palette color */}
      <button
        type="button"
        aria-label="컬러 팔레트 선택"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-okrr-nimbus/40 dark:border-dark-border px-2.5 py-1.5 transition hover:border-neutral-400 dark:hover:border-dark-muted"
      >
        <span
          className="h-4 w-4 rounded-full border border-black/10 shadow-inner"
          style={{ backgroundColor: palettes.find((p) => p.key === palette)?.hex }}
        />
        <span className="hidden text-xs font-semibold text-neutral-500 dark:text-dark-muted sm:block">
          Palette
        </span>
        <span className="text-xs text-neutral-400 dark:text-dark-muted">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-2xl border border-okrr-nimbus/30 dark:border-dark-border bg-white dark:bg-dark-surface shadow-xl p-3">
            <p className="mb-2 px-1 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-dark-muted">
              Okrr Palette
            </p>
            <ul className="flex flex-col gap-1">
              {palettes.map((p) => (
                <li key={p.key}>
                  <button
                    type="button"
                    onClick={() => { setPalette(p.key); setOpen(false) }}
                    className={[
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                      palette === p.key
                        ? 'bg-neutral-100 dark:bg-dark-bg'
                        : 'hover:bg-neutral-50 dark:hover:bg-dark-bg',
                    ].join(' ')}
                  >
                    <span
                      className="h-5 w-5 shrink-0 rounded-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: p.hex }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-neutral-800 dark:text-okrr-cloud">
                        {p.name}
                      </p>
                      <p className="text-xs text-neutral-400 dark:text-dark-muted">
                        PANTONE {p.pantone}
                      </p>
                    </div>
                    {palette === p.key && (
                      <span className="ml-auto text-xs text-neutral-400">✓</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
