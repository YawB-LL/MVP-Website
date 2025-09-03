"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Footer } from "@/components/sections/footer"

export function FooterWrapper() {
  const pathname = usePathname()
  const [shouldShowFooter, setShouldShowFooter] = useState(true)
  
  useEffect(() => {
    // Check pathname on client side to avoid hydration issues
    if (pathname?.startsWith("/studio")) {
      setShouldShowFooter(false)
    } else {
      setShouldShowFooter(true)
    }
  }, [pathname])
  
  // Don't render anything until we've determined the pathname on client
  if (!shouldShowFooter) {
    return null
  }
  
  return <Footer />
}
