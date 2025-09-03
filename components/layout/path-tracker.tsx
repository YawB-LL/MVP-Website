"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function PathTracker() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Set data-path attribute on body for CSS targeting
    document.body.setAttribute('data-path', pathname || '')
  }, [pathname])
  
  return null
}
