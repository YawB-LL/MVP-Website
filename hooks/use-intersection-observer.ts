import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    freezeOnceVisible = false,
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      
      if (entry.isIntersecting) {
        setIsIntersecting(true)
        if (freezeOnceVisible) {
          setHasIntersected(true)
        }
      } else if (!freezeOnceVisible) {
        setIsIntersecting(false)
      }
    },
    [freezeOnceVisible]
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(callback, {
      threshold,
      rootMargin,
      root,
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [callback, threshold, rootMargin, root])

  return {
    ref: elementRef,
    isIntersecting: hasIntersected || isIntersecting,
  }
}
