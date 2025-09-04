"use client"

import { useMemo } from "react"
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Share2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

type Props = {
  url: string
  title: string
}

export function ShareButtons({ url, title }: Props) {
  const encoded = useMemo(() => ({
    url: encodeURIComponent(url),
    title: encodeURIComponent(title),
  }), [url, title])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link copied",
        description: "The blog link has been copied to your clipboard.",
        variant: "success",
      })
    } catch {}
  }

  const baseBtn = "inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-text-secondary/20 text-sm text-text-secondary hover:text-text hover:border-primary/50 transition-colors"

  return (
    <div className="flex flex-wrap gap-2">
      <span className="inline-flex items-center gap-2 text-text-secondary mr-2"><Share2 className="w-4 h-4" /> Share:</span>
      <a className={baseBtn} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`}>
        <Twitter className="w-4 h-4" /> Twitter
      </a>
      <a className={baseBtn} target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`}>
        <Facebook className="w-4 h-4" /> Facebook
      </a>
      <a className={baseBtn} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`}>
        <Linkedin className="w-4 h-4" /> LinkedIn
      </a>
      <button className={baseBtn} onClick={copyLink}>
        <LinkIcon className="w-4 h-4" /> Copy Link
      </button>
    </div>
  )
}


