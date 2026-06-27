import { useParams, Navigate, Link } from 'react-router-dom'
import { works, workCategories } from '../data/works'
import { businessAreas } from '../data/site'

function TabNav({ current }) {
  return (
    <nav className="border-b border-okrr-nimbus/30 dark:border-dark-border overflow-x-auto">
      <div className="mx-auto max-w-container section-x">
        <ul className="flex gap-1 min-w-max">
          {workCategories.map((c) => (
            <li key={c.key}>
              <Link
                to={`/works/${c.key}`}
                className={[
                  'inline-block py-4 px-1 mr-6 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap',
                  current === c.key
                    ? 'border-neutral-900 dark:border-okrr-cloud text-neutral-900 dark:text-okrr-cloud'
                    : 'border-transparent text-neutral-400 dark:text-dark-muted hover:text-neutral-700 dark:hover:text-okrr-cloud',
                ].join(' ')}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function CategoryHeader({ category }) {
  const meta = workCategories.find((c) => c.key === category)
  const area = businessAreas.find((b) => b.key === category)
  return (
    <section className="section-y border-b border-okrr-nimbus/20 dark:border-dark-border">
      <div className="mx-auto max-w-container section-x">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
          {meta?.labelEn || 'Works'}
        </p>
        <h1 className="mb-6 text-5xl font-black text-neutral-900 dark:text-okrr-cloud md:text-6xl">
          {meta?.label || 'Works'}
        </h1>
        {area && (
          <p className="max-w-2xl text-base leading-8 text-neutral-500 dark:text-dark-muted md:text-lg">
            {area.desc}
          </p>
        )}
      </div>
    </section>
  )
}

const categoryLabelMap = {
  exhibition: '전시 기획',
  event: '행사 기획',
  consulting: '아트 컨설팅',
  decoration: '미술 장식품',
  artist: '아티스트 에이전시',
  ip: 'IP 개발',
  rental: '유통 및 렌탈',
}

function WorkCard({ work, large = false }) {
  return (
    <div
      className={[
        'card-base p-7 flex flex-col gap-4 group',
        large ? 'md:col-span-2' : '',
      ].join(' ')}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <span className="tag bg-okrr-nimbus/30 dark:bg-dark-surface text-neutral-500 dark:text-dark-muted text-xs">
          {categoryLabelMap[work.category] || work.category}
        </span>
        <span className="text-xs text-neutral-400 dark:text-dark-muted">{work.period}</span>
      </div>
      <div>
        <p className="mb-0.5 text-xs text-neutral-400 dark:text-dark-muted">{work.subtitle}</p>
        <h3
          className={[
            'font-black leading-tight text-neutral-900 dark:text-okrr-cloud',
            large ? 'text-2xl md:text-3xl' : 'text-xl',
          ].join(' ')}
        >
          {work.title}
        </h3>
      </div>
      <p className="text-sm font-medium text-neutral-500 dark:text-dark-muted">
        📍 {work.venue}
      </p>
      <p className="text-sm leading-7 text-neutral-600 dark:text-dark-muted">
        {work.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {work.tags.map((t) => (
          <span
            key={t}
            className="tag bg-okrr-cloud dark:bg-dark-bg text-neutral-500 dark:text-dark-muted border border-okrr-nimbus/30 dark:border-dark-border"
          >
            #{t}
          </span>
        ))}
      </div>
    </div>
  )
}

function WorksList({ category }) {
  const filtered = (category === 'all' ? works : works.filter((w) => w.category === category))
    .slice()
    .sort((a, b) => {
      const toNum = (p) => { const [y, m = '0'] = p.split('.'); return parseInt(y) * 100 + parseInt(m) }
      return toNum(b.period) - toNum(a.period)
    })

  if (filtered.length === 0) {
    return (
      <div className="section-y mx-auto max-w-container section-x text-center">
        <p className="text-neutral-400 dark:text-dark-muted">
          해당 카테고리의 작업이 곧 업데이트됩니다.
        </p>
      </div>
    )
  }

  return (
    <section className="section-y">
      <div className="mx-auto max-w-container section-x">
        <p className="mb-8 text-sm text-neutral-400 dark:text-dark-muted">
          총 <span className="font-bold text-neutral-900 dark:text-okrr-cloud">{filtered.length}</span>건
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((w, i) => (
            <WorkCard key={w.id} work={w} large={i === 0 && category === 'all'} />
          ))}
        </div>
      </div>
    </section>
  )
}

const validCategories = workCategories.map((c) => c.key)

export default function Works() {
  const { category = 'all' } = useParams()
  if (!validCategories.includes(category)) return <Navigate to="/works/all" replace />

  return (
    <>
      <TabNav current={category} />
      <CategoryHeader category={category} />
      <WorksList category={category} />
    </>
  )
}
