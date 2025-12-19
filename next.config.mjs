import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/articles/*': ['./src/app/articles/**/*.mdx'],
    '/projects/*': ['./src/app/projects/**/*.mdx'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
