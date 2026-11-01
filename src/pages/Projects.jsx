import { projects } from '../data/projects'

function ProjectCard({ project }) {
  return (
    <div className="card-base overflow-hidden md:flex">
      <div className="relative aspect-[4/3] md:w-1/2">
        {project.image && (
          <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        )}
        {project.upcoming && (
          <span className="absolute top-4 left-4 rounded-full bg-okrr-mint-dark px-3 py-1 text-xs font-semibold text-white">
            Upcoming
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center gap-4 p-8 md:w-1/2 md:p-12">
        {project.period && (
          <p className="text-xs font-semibold tracking-widest text-neutral-400 dark:text-dark-muted uppercase">
            {project.period}
          </p>
        )}
        <h2 className="text-3xl font-black leading-tight text-neutral-900 dark:text-okrr-cloud md:text-4xl">
          {project.title}
        </h2>
        {project.subtitle && <p className="text-base text-neutral-500 dark:text-dark-muted">{project.subtitle}</p>}
        {project.venue && <p className="text-sm text-neutral-500 dark:text-dark-muted">{project.venue}</p>}
        {project.description && (
          <p className="text-sm leading-7 text-neutral-600 dark:text-dark-muted">{project.description}</p>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <div className="bg-gradient-to-br from-okrr-mint-light via-okrr-mint-light via-75% to-okrr-butter dark:from-dark-surface dark:to-dark-bg">
      <section className="section-y border-b border-okrr-mint-dark/15 dark:border-dark-border">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-okrr-mint-dark uppercase">
            Projects
          </p>
          <h1 className="text-5xl font-black text-neutral-900 dark:text-okrr-cloud md:text-6xl">
            Upcoming Project
          </h1>
        </div>
      </section>
      <section className="section-y">
        <div className="mx-auto max-w-container section-x flex flex-col gap-8">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
