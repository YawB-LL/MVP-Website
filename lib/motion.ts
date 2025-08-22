// Motion variants and utilities for consistent animations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const slideIn = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
}

export const slideUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
}

// Advanced animation variants for premium interactions
export const parallaxVariants = {
  initial: { y: 0 },
  animate: { y: -50 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
}

export const magneticHover = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98 },
}

export const drawLine = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
}

export const countUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay: 0.5 },
}

export const morphButton = {
  initial: { borderRadius: "8px" },
  hover: { borderRadius: "24px", transition: { duration: 0.3 } },
}

export const glowEffect = {
  initial: { boxShadow: "0 0 0 0 rgba(222, 131, 24, 0)" },
  hover: {
    boxShadow: "0 0 20px 5px rgba(222, 131, 24, 0.3)",
    transition: { duration: 0.3 },
  },
}

// Reduced motion safe variants
export const getMotionVariant = (variant: any, prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.01 },
    }
  }
  return variant
}
