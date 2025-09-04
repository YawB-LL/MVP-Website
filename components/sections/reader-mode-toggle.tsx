"use client"

import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ReaderModeToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const scope = document.getElementById("reader-scope")
    if (scope) {
      if (enabled) scope.setAttribute("data-reader-mode", "light")
      else scope.removeAttribute("data-reader-mode")
    }
    return () => {
      const cleanupScope = document.getElementById("reader-scope")
      if (cleanupScope) cleanupScope.removeAttribute("data-reader-mode")
    }
  }, [enabled])

  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-sm text-text-secondary hover:text-text hover:border-primary/40 transition-colors"
      aria-pressed={enabled}
      title="Toggle light reader mode"
    >
      {enabled ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      Reader mode
    </button>
  )
}


