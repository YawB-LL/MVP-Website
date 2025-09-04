"use client"

import type { PortableTextComponents } from "@portabletext/react"
import { PortableText } from "@portabletext/react"

type Props = {
  value: any[]
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-text mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-text mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-text mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-text-secondary leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/40 pl-4 italic text-text-secondary my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 text-text-secondary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 text-text-secondary">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-text font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-text-secondary/10 text-text text-sm">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = (value as any)?.href || "#"
      const blank = (value as any)?.blank
      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="underline underline-offset-2 decoration-primary/60 hover:text-primary"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const url = (value as any)?.url || (value as any)?.asset?.url
      const alt = (value as any)?.alt || ""
      if (!url) return null
      return (
        <figure className="my-6">
          <img src={url} alt={alt} className="rounded-md w-full" />
          {(value as any)?.caption && (
            <figcaption className="text-sm text-text-secondary mt-2">{(value as any).caption}</figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => {
      const type = (value as any)?.type || "info"
      const content = (value as any)?.content || ""
      const colorMap: Record<string, string> = {
        info: "border-blue-400/40 bg-blue-400/5",
        warning: "border-yellow-400/40 bg-yellow-400/5",
        success: "border-green-400/40 bg-green-400/5",
        error: "border-red-400/40 bg-red-400/5",
      }
      const classes = colorMap[type] || colorMap.info
      return (
        <div className={`my-6 p-4 border rounded-lg ${classes}`}>
          <p className="text-text-secondary">{content}</p>
        </div>
      )
    },
  },
}

export function PortableArticle({ value }: Props) {
  if (!value || value.length === 0) return null
  return <PortableText value={value} components={components} />
}


