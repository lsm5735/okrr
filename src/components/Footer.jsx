import { Link } from 'react-router-dom'
import { company } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-okrr-nimbus/30 dark:border-dark-border bg-okrr-cloud dark:bg-dark-bg">
      <div className="mx-auto max-w-container section-x py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="text-2xl font-black tracking-widest text-neutral-900 dark:text-okrr-cloud uppercase">
              {company.name}
            </p>
            <p className="text-sm leading-relaxed text-neutral-500 dark:text-dark-muted">
              {company.slogan}
            </p>
            <p className="text-xs text-neutral-400 dark:text-dark-muted">
              문화예술 프로젝트 기획 및 컨설팅
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-12">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-dark-muted">
                About
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/about/intro"
                    className="text-sm text-neutral-600 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud transition"
                  >
                    회사 소개
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about/vision"
                    className="text-sm text-neutral-600 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud transition"
                  >
                    비전과 미션
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-dark-muted">
                Works
              </p>
              <ul className="flex flex-col gap-2">
                {['전시 기획', '아티스트 에이전시', '아트 컨설팅', '미술 장식품'].map((label, i) => (
                  <li key={i}>
                    <Link
                      to={['/works/exhibition', '/works/artist', '/works/consulting', '/works/decoration'][i]}
                      className="text-sm text-neutral-600 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-dark-muted">
                Contact
              </p>
              <ul className="flex flex-col gap-2">
                <li className="text-sm text-neutral-600 dark:text-dark-muted">{company.contact.tel}</li>
                <li>
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="text-sm text-neutral-600 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud transition"
                  >
                    {company.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-okrr-nimbus/30 dark:border-dark-border pt-8 md:flex-row md:items-center">
          <p className="text-xs text-neutral-400 dark:text-dark-muted">{company.copyright}</p>
          <div className="flex gap-6">
            <Link
              to="/contact"
              className="text-xs text-neutral-400 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud transition"
            >
              Contact
            </Link>
            <Link
              to="/about/intro"
              className="text-xs text-neutral-400 dark:text-dark-muted hover:text-neutral-900 dark:hover:text-okrr-cloud transition"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
