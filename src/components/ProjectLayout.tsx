import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { type ProjectWithSlug } from '@/lib/projects'
import { BackButton } from './BackButton'
import { AnimatedStatAndCircle } from './AnimatedStatAndCircle'

export function ProjectLayout({
  project,
  children,
}: {
  project: ProjectWithSlug
  children: React.ReactNode
}) {
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <BackButton />
          <article>
            <header className="flex flex-col">
              <h1 className="-mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {project.title}
              </h1>
              {project.stats && (
                <div className="mt-8 grid grid-cols-4 gap-4">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      <AnimatedStatAndCircle value={stat.value} stat={stat} />
                      <span className="mt-2 block text-center font-semibold">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </header>
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
