import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { company, businessAreas } from '../data/site'
import { works } from '../data/works'
import { videos } from '../data/videos'
import useScrollReveal from '../hooks/useScrollReveal'

// Hero slides
const slides = [
  {
    label: '01',
    copy: 'Our life\nin Art',
    sub: '예술의 경계를 넓히다',
    color: 'from-okrr-ice/40 to-okrr-rose/30 dark:from-dark-surface dark:to-dark-bg',
  },
  {
    label: '02',
    copy: 'Art\nBeyond\nBoundaries',
    sub: '창조의 가치를 더하다',
    color: 'from-okrr-aqua/40 to-okrr-cloud dark:from-dark-surface dark:to-dark-bg',
  },
  {
    label: '03',
    copy: 'Culture\nMeets\nArt',
    sub: '문화예술 프로젝트 기획 및 컨설팅',
    color: 'from-okrr-rose/40 to-okrr-nimbus/30 dark:from-dark-surface dark:to-dark-bg',
  },
]

function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[560px] overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={[
            'absolute inset-0 transition-opacity duration-1000 bg-gradient-to-br',
            s.color,
            i === idx ? 'opacity-100' : 'opacity-0 pointer-events-none',
          ].join(' ')}
        >
          {/* Decorative circles */}
          <div className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-okrr-rose/20 dark:bg-okrr-rose/5 blur-3xl" />
          <div className="absolute bottom-1/3 left-[5%] w-96 h-96 rounded-full bg-okrr-ice/20 dark:bg-okrr-ice/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-okrr-aqua/20 dark:bg-okrr-aqua/5 blur-2xl" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end section-x pb-20">
        {slides.map((s, i) => (
          <div
            key={i}
            className={[
              'absolute bottom-0 left-0 right-0 transition-all duration-1000 section-x pb-20',
              i === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
            ].join(' ')}
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-500 dark:text-dark-muted uppercase">
              Okrr Art Agency — {s.sub}
            </p>
            <h1 className="whitespace-pre-line text-6xl font-black leading-[1.05] text-neutral-900 dark:text-okrr-cloud md:text-8xl lg:text-[7rem] xl:text-[8rem]">
              {s.copy}
            </h1>
          </div>
        ))}

        {/* Slide controls */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between section-x">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`슬라이드 ${i + 1}`}
                className={[
                  'h-0.5 rounded-full transition-all duration-500',
                  i === idx
                    ? 'w-10 bg-neutral-900 dark:bg-okrr-cloud'
                    : 'w-4 bg-neutral-300 dark:bg-dark-border',
                ].join(' ')}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="이전"
              onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 dark:border-dark-border text-sm text-neutral-600 dark:text-dark-muted hover:bg-neutral-100 dark:hover:bg-dark-surface transition"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="다음"
              onClick={() => setIdx((i) => (i + 1) % slides.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 dark:border-dark-border text-sm text-neutral-600 dark:text-dark-muted hover:bg-neutral-100 dark:hover:bg-dark-surface transition"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CountUp({ target, suffix = '', duration = 1600 }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      const start = Date.now()
      const num = parseInt(target.replace(/\D/g, ''), 10)
      const tick = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(ease * num).toLocaleString() + suffix)
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return <span ref={ref}>{display}</span>
}

function Stats() {
  const stats = [
    { target: '2017', suffix: '',  label: 'Est.' },
    { target: '50',   suffix: '+', label: '프로젝트' },
    { target: '100',  suffix: '+', label: '협력 작가' },
    { target: '6',    suffix: '',  label: '사업 영역' },
  ]
  return (
    <section className="border-y border-okrr-nimbus/30 dark:border-dark-border bg-white dark:bg-dark-surface">
      <div className="mx-auto max-w-container section-x py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center" data-reveal>
              <p className="text-3xl font-black text-neutral-900 dark:text-okrr-cloud md:text-4xl">
                <CountUp target={s.target} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs font-medium tracking-widest text-neutral-400 dark:text-dark-muted uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutIntro() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-container section-x">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
          <div className="lg:w-1/2" data-reveal>
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
              About Okrr
            </p>
            <h2 className="text-4xl font-black leading-tight text-neutral-900 dark:text-okrr-cloud md:text-5xl lg:text-6xl">
              Our life
              <br />
              in Art
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:w-1/2 lg:pt-4" data-reveal data-delay="150">
            {company.description.map((p, i) => (
              <p key={i} className="text-base leading-8 text-neutral-600 dark:text-dark-muted md:text-lg">
                {p}
              </p>
            ))}
            <div className="mt-4">
              <Link to="/about/intro" className="btn-outline">
                회사 소개 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BusinessGrid() {
  return (
    <section className="section-y bg-white dark:bg-dark-surface">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
            Business Area
          </p>
          <h2 className="text-4xl font-black text-neutral-900 dark:text-okrr-cloud md:text-5xl">
            What We Do
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businessAreas.map((b, i) => (
            <Link
              key={b.key}
              to={b.to}
              data-reveal
              data-delay={i * 80}
              className="group flex flex-col gap-4 rounded-2xl border border-okrr-nimbus/40 dark:border-dark-border p-7 transition hover:border-neutral-300 dark:hover:border-dark-muted hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-widest text-neutral-300 dark:text-dark-border">
                  {b.number}
                </span>
                <span className="text-neutral-300 dark:text-dark-border group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-neutral-400 dark:text-dark-muted">
                  {b.titleEn}
                </p>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-okrr-cloud">
                  {b.title}
                </h3>
              </div>
              <p className="text-sm leading-7 text-neutral-500 dark:text-dark-muted line-clamp-3">
                {b.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedWorks() {
  const featured = [12, 1, 2, 3].map((id) => works.find((w) => w.id === id)).filter(Boolean)
  return (
    <section className="section-y">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
              Reference
            </p>
            <h2 className="text-4xl font-black text-neutral-900 dark:text-okrr-cloud md:text-5xl">
              Featured Works
            </h2>
          </div>
          <Link to="/works/all" className="btn-outline shrink-0">
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((w, i) => (
            <div
              key={w.id}
              className={[
                'card-base p-8 flex flex-col gap-4',
                i === 0 ? 'md:col-span-2' : '',
              ].join(' ')}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="mb-1 text-xs font-semibold tracking-widest text-neutral-400 dark:text-dark-muted uppercase">
                    {['전시 기획', '아트 컨설팅', '미술 장식품'][['exhibition', 'consulting', 'decoration'].indexOf(w.category)] || w.category}
                  </p>
                  <h3 className={['font-black leading-tight text-neutral-900 dark:text-okrr-cloud', i === 0 ? 'text-3xl md:text-4xl' : 'text-xl'].join(' ')}>
                    {w.title}
                  </h3>
                </div>
                <span className="text-xs text-neutral-400 dark:text-dark-muted shrink-0">
                  {w.period}
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-dark-muted">{w.venue}</p>
              <p className="text-sm leading-7 text-neutral-600 dark:text-dark-muted">
                {w.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <span
                    key={t}
                    className="tag bg-okrr-nimbus/30 dark:bg-dark-surface text-neutral-500 dark:text-dark-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


function VisionBand() {
  return (
    <section className="relative overflow-hidden section-y bg-neutral-900 dark:bg-dark-surface">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-okrr-rose blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-okrr-ice blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-container section-x text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-neutral-400 uppercase">
          Vision & Mission
        </p>
        <h2 className="mb-8 text-3xl font-black leading-snug text-okrr-cloud md:text-5xl lg:text-6xl max-w-4xl mx-auto">
          미술 시장의 변화에 발맞춰<br />지속 가능한 창작 환경을 조성합니다
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-8 text-neutral-400 md:text-lg">
          아티스트와 고객 모두에게 영감을 주는 플랫폼이 되는 것을 목표로 합니다.
          우리는 예술의 경계를 넓히고, 창조적 가치를 더하는 데 최선을 다하겠습니다.
        </p>
        <div className="mt-10">
          <Link to="/about/vision" className="btn-primary">
            비전과 미션 →
          </Link>
        </div>
      </div>
    </section>
  )
}

function ContactBand() {
  return (
    <section className="section-y bg-white dark:bg-dark-surface">
      <div className="mx-auto max-w-container section-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
              Get in Touch
            </p>
            <h2 className="text-3xl font-black text-neutral-900 dark:text-okrr-cloud md:text-4xl">
              프로젝트를 함께 시작해 볼까요?
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${company.contact.email}`}
              className="btn-outline text-center justify-center"
            >
              이메일 문의
            </a>
            <Link to="/contact" className="btn-primary text-center justify-center">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideosPreview() {
  const preview = [11, 1, 7].map((id) => videos.find((v) => v.id === id)).filter(Boolean)
  const [playing, setPlaying] = useState(null)

  return (
    <section className="section-y bg-white dark:bg-dark-surface">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
              Videos
            </p>
            <h2 className="text-4xl font-black text-neutral-900 dark:text-okrr-cloud md:text-5xl">
              Film & Records
            </h2>
          </div>
          <Link to="/videos/all" className="btn-outline shrink-0">
            More →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {preview.map((v) => (
            <div key={v.id} className="card-base overflow-hidden group">
              <div className="relative aspect-video bg-neutral-100 dark:bg-dark-border">
                <img
                  src={`https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`}
                  alt={v.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                <button
                  type="button"
                  onClick={() => setPlaying(v)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform group-hover:scale-110">
                    ▷
                  </span>
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-neutral-400 dark:text-dark-muted mb-1">{v.date}</p>
                <h3 className="text-sm font-bold leading-snug text-neutral-900 dark:text-okrr-cloud line-clamp-2">
                  {v.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {playing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setPlaying(null)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPlaying(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:opacity-70 transition"
            >
              ✕
            </button>
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${playing.videoId}?autoplay=1`}
                title={playing.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full rounded-xl"
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-white">{playing.title}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default function Home() {
  useScrollReveal()
  return (
    <>
      <Hero />
      <Stats />
      <VideosPreview />
      <AboutIntro />
      <BusinessGrid />
      <FeaturedWorks />
      <VisionBand />
      <ContactBand />
    </>
  )
}
