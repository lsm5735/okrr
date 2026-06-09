import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { videos, videoCategories, VIDEOS_PER_PAGE } from '../data/videos'

function TabNav({ current }) {
  return (
    <nav className="border-b border-okrr-nimbus/30 dark:border-dark-border">
      <div className="mx-auto max-w-container section-x">
        <ul className="flex gap-1">
          {videoCategories.map((c) => (
            <li key={c.key}>
              <Link
                to={`/videos/${c.key}`}
                className={[
                  'inline-block py-4 px-1 mr-6 text-sm font-semibold border-b-2 transition-colors',
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

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  const isPlaceholder = video.videoId.startsWith('VIDEO_ID_')

  const thumbUrl = video.thumbnail
    || (isPlaceholder ? null : `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`)

  return (
    <div className="card-base overflow-hidden group">
      {/* Thumbnail / Player */}
      <div className="relative aspect-video bg-neutral-100 dark:bg-dark-border">
        {playing && !isPlaceholder ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {thumbUrl ? (
              <img
                src={thumbUrl}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-okrr-nimbus/30 to-okrr-rose/20 dark:from-dark-surface dark:to-dark-bg">
                <span className="text-4xl text-neutral-300 dark:text-dark-border">▷</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <button
              type="button"
              aria-label={`${video.title} 재생`}
              onClick={() => !isPlaceholder && setPlaying(true)}
              className={[
                'absolute inset-0 flex items-center justify-center',
                isPlaceholder ? 'cursor-default' : 'cursor-pointer',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 text-xl shadow-lg transition-transform',
                  !isPlaceholder && 'group-hover:scale-110',
                ].join(' ')}
              >
                ▷
              </span>
            </button>
            {isPlaceholder && (
              <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                영상 준비 중
              </span>
            )}
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="text-xs font-semibold tracking-widest text-neutral-400 dark:text-dark-muted uppercase">
            {video.date}
          </p>
          <span className="tag bg-okrr-nimbus/30 dark:bg-dark-surface text-neutral-500 dark:text-dark-muted text-xs">
            {video.category === 'exhibition' ? '전시' : '행사'}
          </span>
        </div>
        <h3 className="mb-2 font-bold leading-tight text-neutral-900 dark:text-okrr-cloud line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs leading-5 text-neutral-500 dark:text-dark-muted line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  )
}

function Pagination({ current, total, onPage }) {
  if (total <= 1) return null
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={current === 1}
        onClick={() => onPage(current - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-okrr-nimbus/40 dark:border-dark-border text-sm text-neutral-600 dark:text-dark-muted hover:bg-neutral-100 dark:hover:bg-dark-surface disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ←
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPage(p)}
          className={[
            'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition',
            p === current
              ? 'bg-neutral-900 dark:bg-okrr-cloud text-white dark:text-neutral-900'
              : 'border border-okrr-nimbus/40 dark:border-dark-border text-neutral-600 dark:text-dark-muted hover:bg-neutral-100 dark:hover:bg-dark-surface',
          ].join(' ')}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={current === total}
        onClick={() => onPage(current + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-okrr-nimbus/40 dark:border-dark-border text-sm text-neutral-600 dark:text-dark-muted hover:bg-neutral-100 dark:hover:bg-dark-surface disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        →
      </button>
    </div>
  )
}

function VideoGrid({ category }) {
  const [page, setPage] = useState(1)

  const filtered =
    category === 'all' ? videos : videos.filter((v) => v.category === category)

  const totalPages = Math.ceil(filtered.length / VIDEOS_PER_PAGE)
  const paged = filtered.slice((page - 1) * VIDEOS_PER_PAGE, page * VIDEOS_PER_PAGE)

  const handlePage = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (filtered.length === 0) {
    return (
      <div className="section-y mx-auto max-w-container section-x text-center">
        <p className="text-neutral-400 dark:text-dark-muted">해당 카테고리의 영상이 곧 업로드됩니다.</p>
      </div>
    )
  }

  return (
    <section className="section-y">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-neutral-400 dark:text-dark-muted">
            총 <span className="font-bold text-neutral-900 dark:text-okrr-cloud">{filtered.length}</span>개 영상
            {totalPages > 1 && (
              <span className="ml-2">
                — {page} / {totalPages} 페이지
              </span>
            )}
          </p>
        </div>

        {/* 2-column × 3-row grid = 6 per page */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 xl:gap-8">
          {paged.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>

        <Pagination current={page} total={totalPages} onPage={handlePage} />
      </div>
    </section>
  )
}

const validCategories = videoCategories.map((c) => c.key)

export default function Videos() {
  const { category = 'all' } = useParams()
  if (!validCategories.includes(category)) return <Navigate to="/videos/all" replace />

  const meta = videoCategories.find((c) => c.key === category)

  return (
    <>
      <TabNav current={category} />
      <section className="section-y border-b border-okrr-nimbus/20 dark:border-dark-border">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
            {meta?.labelEn}
          </p>
          <h1 className="text-5xl font-black text-neutral-900 dark:text-okrr-cloud md:text-6xl">
            {meta?.label}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 dark:text-dark-muted">
            행사와 전시 관련 영상을 유튜브에서 만나보세요.
            각 카테고리별로 Okrr의 프로젝트 현장을 확인하실 수 있습니다.
          </p>
        </div>
      </section>
      <VideoGrid category={category} />
    </>
  )
}
