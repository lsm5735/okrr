import { createContext, useContext, useEffect, useState } from 'react'

export const palettes = [
  { key: 'cloud',  name: 'Cloud Dancer',       hex: '#EFE9E1', rgb: '239 233 225', pantone: '11-4201' },
  { key: 'nimbus', name: 'Nimbus Cloud',        hex: '#C8CBCF', rgb: '200 203 207', pantone: '13-4108' },
  { key: 'rose',   name: 'Raindrops on Roses',  hex: '#EDD5D8', rgb: '237 213 216', pantone: '11-1400' },
  { key: 'ice',    name: 'Ice Melt',             hex: '#BFD0E0', rgb: '191 208 224', pantone: '13-4306' },
  { key: 'aqua',   name: 'Almost Aqua',          hex: '#B5C4B5', rgb: '181 196 181', pantone: '13-6006' },
]

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [palette, setPaletteState] = useState(
    () => localStorage.getItem('okrr-palette') || 'cloud',
  )

  const setPalette = (key) => {
    const p = palettes.find((p) => p.key === key) || palettes[0]
    document.documentElement.style.setProperty('--palette-bg-rgb', p.rgb)
    localStorage.setItem('okrr-palette', key)
    setPaletteState(key)
  }

  // Sync on mount in case localStorage differs
  useEffect(() => {
    const stored = localStorage.getItem('okrr-palette') || 'cloud'
    const p = palettes.find((p) => p.key === stored) || palettes[0]
    document.documentElement.style.setProperty('--palette-bg-rgb', p.rgb)
  }, [])

  return (
    <ThemeContext.Provider value={{ palette, setPalette, palettes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const usePalette = () => useContext(ThemeContext)
