import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllProjects, ProjectWithSlug } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Design and development projects.',
}

async function Project({ project }: { project: ProjectWithSlug }) {
  return (
    <li key={project.title}>
      <Card>
        <div className="relative h-44 w-full overflow-hidden rounded-xl bg-white shadow-md shadow-zinc-800/15 dark:bg-zinc-800">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="33vw 50vw 100vw"
            className="object-cover object-top"
          />
        </div>
        <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
          <Card.Link href={`/projects/${project.slug}`}>
            {project.title}
          </Card.Link>
        </h2>
        <Card.Description>{project.description}</Card.Description>
        <p className="relative z-10 mt-6 flex gap-2 text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
          <span>View Project</span>
        </p>
      </Card>
    </li>
  )
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <SimpleLayout
      title="Design and development projects."
      intro="Most of the work I do is proprietary to the companies I work for. Here is some of the projects I've worked on in the past"
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Project key={project.slug} project={project} />
        ))}
      </ul>
    </SimpleLayout>
  )
}
