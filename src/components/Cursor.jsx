import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const raf     = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // hide on touch devices
    if (window.matchMedia('(pointer:coarse)').matches) return

    document.documentElement.style.cursor = 'none'

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', onMove)

    const interactives = 'a, button, [role=button], input, textarea, select, label'
    document.querySelectorAll(interactives).forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    const loop = () => {
      const dot  = dotRef.current
      const ring = ringRef.current
      if (dot && ring) {
        dot.style.transform  = `translate(${pos.current.x}px, ${pos.current.y}px)`
        // ring follows with lerp
        const prev = { x: parseFloat(ring.dataset.x || pos.current.x), y: parseFloat(ring.dataset.y || pos.current.y) }
        const next = { x: prev.x + (pos.current.x - prev.x) * 0.15, y: prev.y + (pos.current.y - prev.y) * 0.15 }
        ring.dataset.x = next.x
        ring.dataset.y = next.y
        ring.style.transform = `translate(${next.x}px, ${next.y}px)`
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Dot — follows exactly */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
        style={{ willChange: 'transform' }}
      >
        <div
          className="h-2 w-2 rounded-full bg-neutral-900 dark:bg-okrr-cloud transition-transform duration-150"
          style={{
            transform: hovering ? 'translate(-50%, -50%) scale(0)' : 'translate(-50%, -50%) scale(1)',
          }}
        />
      </div>

      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full border border-neutral-900 dark:border-okrr-cloud transition-all duration-200"
          style={{
            width:  hovering ? '44px' : '28px',
            height: hovering ? '44px' : '28px',
            transform: 'translate(-50%, -50%)',
            opacity: hovering ? 0.5 : 0.35,
          }}
        />
      </div>
    </>
  )
}
