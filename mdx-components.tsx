import Image, { type ImageProps } from 'next/image'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
    FigureImage: ({ src, alt, caption }: { caption?: string } & ImageProps) => {
      return (
        <figure>
          <Image src={src} alt={alt} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    },
  }
}
