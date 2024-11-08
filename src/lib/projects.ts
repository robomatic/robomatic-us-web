import glob from 'fast-glob'
import { ImageProps } from 'next/image'

interface ProjectStat {
  label: string
  value: number
}

interface Project {
  title: string
  company: string
  description: string
  date: string
  stats?: ProjectStat[]
  logo: ImageProps['src']
  image: ImageProps['src']
}

export interface ProjectWithSlug extends Project {
  slug: string
}

async function importProject(
  projectFilename: string,
): Promise<ProjectWithSlug> {
  const { project } = (await import(`../app/projects/${projectFilename}`)) as {
    default: React.ComponentType
    project: Project
  }

  return {
    slug: projectFilename.replace(/(\/page)?\.mdx$/, ''),
    ...project,
  }
}

export async function getAllProjects() {
  const projectFilenames = await glob('*/page.mdx', {
    cwd: './src/app/projects',
  })

  const projects = await Promise.all(projectFilenames.map(importProject))

  return projects.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}
