import type { MDXComponents } from "mdx/types"
import Image, { type ImageProps } from "next/image"

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => {
      const { alt, ...rest } = props
      return <Image alt={alt} {...rest} />
    },
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
