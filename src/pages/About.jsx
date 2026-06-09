import { useParams, Navigate, Link } from 'react-router-dom'
import { company } from '../data/site'

const tabs = [
  { label: '회사 소개', key: 'intro', to: '/about/intro' },
  { label: '비전과 미션', key: 'vision', to: '/about/vision' },
]

function TabNav({ current }) {
  return (
    <nav className="border-b border-okrr-nimbus/30 dark:border-dark-border">
      <div className="mx-auto max-w-container section-x">
        <ul className="flex gap-1">
          {tabs.map((t) => (
            <li key={t.key}>
              <Link
                to={t.to}
                className={[
                  'inline-block py-4 px-1 mr-6 text-sm font-semibold border-b-2 transition-colors',
                  current === t.key
                    ? 'border-neutral-900 dark:border-okrr-cloud text-neutral-900 dark:text-okrr-cloud'
                    : 'border-transparent text-neutral-400 dark:text-dark-muted hover:text-neutral-700 dark:hover:text-okrr-cloud',
                ].join(' ')}
              >
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function PageHeader({ en, ko }) {
  return (
    <section className="section-y border-b border-okrr-nimbus/20 dark:border-dark-border">
      <div className="mx-auto max-w-container section-x">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
          {en}
        </p>
        <h1 className="text-5xl font-black text-neutral-900 dark:text-okrr-cloud md:text-6xl">
          {ko}
        </h1>
      </div>
    </section>
  )
}

function Intro() {
  const values = [
    {
      icon: '◎',
      title: '전시 기획',
      desc: '아티스트의 비전을 공간으로 구현하는 전문 전시 기획 서비스',
    },
    {
      icon: '◈',
      title: '아티스트 에이전시',
      desc: '작가의 경력 개발을 위한 전략적 파트너십',
    },
    {
      icon: '◇',
      title: '아트 컨설팅',
      desc: '브랜드와 예술의 창의적 만남을 설계하는 컨설팅',
    },
    {
      icon: '◆',
      title: '공공 미술',
      desc: '도시와 공간에 예술의 생명을 불어넣는 프로젝트',
    },
  ]

  return (
    <div className="mx-auto max-w-container section-x section-y">
      <div className="mb-20 flex flex-col gap-12 lg:flex-row">
        <div className="lg:w-1/3">
          <p className="text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase mb-4">
            About Company
          </p>
          <h2 className="text-4xl font-black leading-tight text-neutral-900 dark:text-okrr-cloud">
            예술의 경계를<br />넓히다
          </h2>
        </div>
        <div className="flex flex-col gap-5 lg:w-2/3">
          {company.description.map((p, i) => (
            <p key={i} className="text-base leading-8 text-neutral-600 dark:text-dark-muted md:text-lg">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div
            key={v.title}
            className="card-base p-7 flex flex-col gap-4"
          >
            <span className="text-2xl text-neutral-300 dark:text-dark-border">{v.icon}</span>
            <h3 className="font-bold text-neutral-900 dark:text-okrr-cloud">{v.title}</h3>
            <p className="text-sm leading-6 text-neutral-500 dark:text-dark-muted">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-20 grid grid-cols-2 gap-8 border-t border-okrr-nimbus/30 dark:border-dark-border pt-16 md:grid-cols-4">
        {[
          { value: '2017', label: '설립 연도' },
          { value: '50+', label: '완수 프로젝트' },
          { value: '100+', label: '협력 작가' },
          { value: '6', label: '사업 영역' },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-4xl font-black text-neutral-900 dark:text-okrr-cloud md:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-xs font-medium tracking-widest text-neutral-400 dark:text-dark-muted uppercase">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Vision() {
  const missions = [
    {
      title: '지속 가능한 창작 환경',
      desc: '미술 시장의 변화에 발맞춰 아티스트가 지속적으로 창작 활동에 집중할 수 있는 환경을 만들어갑니다.',
      color: 'bg-okrr-rose/30 dark:bg-okrr-rose/10',
    },
    {
      title: '예술과 비즈니스의 연결',
      desc: '아티스트와 고객, 브랜드와 예술 사이의 가교 역할을 통해 새로운 가치를 창출합니다.',
      color: 'bg-okrr-ice/30 dark:bg-okrr-ice/10',
    },
    {
      title: '창조적 가치의 극대화',
      desc: '혁신적이고 창의적인 미술 프로젝트를 통해 예술의 가치와 가능성을 세상에 널리 알립니다.',
      color: 'bg-okrr-aqua/30 dark:bg-okrr-aqua/10',
    },
  ]

  return (
    <div className="mx-auto max-w-container section-x section-y">
      {/* Vision statement */}
      <div className="mb-20 rounded-3xl bg-neutral-900 dark:bg-dark-surface p-12 md:p-16 lg:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-okrr-rose blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-okrr-ice blur-3xl" />
        </div>
        <div className="relative z-10">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase">
            Our Vision
          </p>
          <p className="text-2xl font-black leading-relaxed text-okrr-cloud md:text-4xl lg:text-5xl max-w-4xl mx-auto">
            "미술 시장의 변화에 발맞춰<br />
            지속 가능한 창작 환경을 조성하고,<br />
            아티스트와 고객 모두에게<br />
            영감을 주는 플랫폼"
          </p>
        </div>
      </div>

      {/* Mission cards */}
      <div className="mb-16">
        <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-neutral-400 dark:text-dark-muted uppercase">
          Our Mission
        </p>
        <h2 className="mb-10 text-4xl font-black text-neutral-900 dark:text-okrr-cloud">
          우리가 추구하는 가치
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {missions.map((m, i) => (
            <div key={i} className={['rounded-2xl p-8', m.color].join(' ')}>
              <span className="text-4xl font-black text-neutral-200 dark:text-dark-border">
                0{i + 1}
              </span>
              <h3 className="mt-4 mb-3 text-xl font-bold text-neutral-900 dark:text-okrr-cloud">
                {m.title}
              </h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-surface border border-okrr-nimbus/30 dark:border-dark-border p-10 text-center">
        <p className="text-lg font-bold text-neutral-900 dark:text-okrr-cloud mb-2">
          우리는 예술의 경계를 넓히고, 창조적 가치를 더하는 데 최선을 다하겠습니다.
        </p>
        <p className="text-sm text-neutral-500 dark:text-dark-muted">— {company.fullName}</p>
      </div>
    </div>
  )
}

const pages = { intro: Intro, vision: Vision }

export default function About() {
  const { tab } = useParams()
  if (!pages[tab]) return <Navigate to="/about/intro" replace />
  const Content = pages[tab]

  return (
    <>
      <TabNav current={tab} />
      <PageHeader
        en={tab === 'intro' ? 'About Okrr' : 'Vision & Mission'}
        ko={tab === 'intro' ? '회사 소개' : '비전과 미션'}
      />
      <Content />
    </>
  )
}
