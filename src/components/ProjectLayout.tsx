'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { type ProjectWithSlug } from '@/lib/projects'

function bezier(
  t: number,
  initial: number,
  p1: number,
  p2: number,
  final: number,
) {
  return (
    (1 - t) * (1 - t) * (1 - t) * initial +
    3 * (1 - t) * (1 - t) * t * p1 +
    3 * (1 - t) * t * t * p2 +
    t * t * t * final
  )
}

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AnimatedStat({ mounted, value }: { mounted: boolean; value: number }) {
  const incrementedStat = useRef(0)
  const timerRef = useRef<string | number | NodeJS.Timeout | undefined>()
  const elementRef = useRef<HTMLHeadingElement>(null)
  const timer = () => {
    const timeIncrement = 1000 / value
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    return (timerRef.current = setTimeout(() => {
      incrementedStat.current += 1
      if (elementRef.current) {
        if (value !== 0) {
          elementRef.current.innerText =
            Math.ceil(
              value *
                bezier(
                  (timeIncrement * incrementedStat.current) / 1000,
                  0,
                  1,
                  1,
                  1,
                ),
            ).toString() + '%'
        } else {
          elementRef.current.innerText = '0%'
        }
      }
      if (incrementedStat.current < value) {
        timerRef.current = timer()
      }
    }, timeIncrement))
  }

  useEffect(() => {
    timerRef.current = timer()
    return () => clearTimeout(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  return (
    <span
      ref={elementRef}
      className="absolute inset-0 z-10 flex items-center justify-center text-center font-semibold"
    >
      -
    </span>
  )
}

export function ProjectLayout({
  project,
  children,
}: {
  project: ProjectWithSlug
  children: React.ReactNode
}) {
  const router = useRouter()
  const { previousPathname } = useContext(AppContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to projects"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="-mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {project.title}
              </h1>
              {project.stats && (
                <div className="mt-8 grid grid-cols-4 gap-4">
                  {project.stats.map((stat) => (
                    <ul
                      key={stat.label}
                      className="flex text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      <li className="">
                        <div className="relative">
                          <svg
                            viewBox="0 0 220 220"
                            className="h-24 w-24 rotate-90"
                          >
                            <circle
                              className="stroke-zinc-100 dark:stroke-zinc-950/80"
                              cx="50%"
                              cy="50%"
                              r="100"
                              fill="none"
                              strokeWidth="20"
                            />
                            <circle
                              className={`${mounted ? 'animate-dash' : ''} stroke-zinc-500`}
                              cx="50%"
                              cy="50%"
                              r="100"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="20"
                              strokeDashoffset={
                                mounted ? 629 * (1 - stat.value / 100) : 629
                              }
                              strokeDasharray="629"
                            />
                          </svg>
                          <AnimatedStat mounted={mounted} value={stat.value} />
                        </div>
                        <span className="mt-2 block flex-auto text-center font-semibold">
                          {stat.label}
                        </span>
                      </li>
                    </ul>
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
