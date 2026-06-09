export default function Marquee({ items, speed = 30 }) {
  const repeated = [...items, ...items]   // duplicate for seamless loop

  return (
    <div className="overflow-hidden border-y border-okrr-nimbus/30 dark:border-dark-border py-4 bg-white dark:bg-dark-surface select-none">
      <div
        className="flex gap-0 whitespace-nowrap marquee-track"
        style={{ '--speed': `${speed}s` }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 pr-12 text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 dark:text-dark-muted"
          >
            <span className="text-okrr-aqua">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
