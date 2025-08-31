// Optimized motion variants and utilities for better performance
// Uses CSS transforms and opacity for GPU acceleration
// Reduces JavaScript execution time by simplifying animations

export const fadeInUp = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { 
    duration: 0.3, 
    ease: [0.22, 1, 0.36, 1],
    // Use will-change for better performance
    willChange: 'opacity, transform'
  },
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.08, // Slightly increased for better performance
      delayChildren: 0.1,
    },
  },
}

export const slideIn = {
  initial: { opacity: 0, transform: 'translateX(-20px)' },
  animate: { opacity: 1, transform: 'translateX(0px)' },
  transition: { 
    duration: 0.3, 
    ease: [0.22, 1, 0.36, 1],
    willChange: 'opacity, transform'
  },
}

export const scaleIn = {
  initial: { opacity: 0, transform: 'scale(0.95)' },
  animate: { opacity: 1, transform: 'scale(1)' },
  transition: { 
    duration: 0.3, 
    ease: [0.22, 1, 0.36, 1],
    willChange: 'opacity, transform'
  },
}

export const slideUp = {
  initial: { opacity: 0, transform: 'translateY(40px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { 
    duration: 0.4, 
    ease: [0.22, 1, 0.36, 1],
    willChange: 'opacity, transform'
  },
}

// Simplified parallax for better performance
export const parallaxVariants = {
  initial: { transform: 'translateY(0px)' },
  animate: { transform: 'translateY(-30px)' }, // Reduced movement
  transition: { 
    duration: 0.6, 
    ease: [0.22, 1, 0.36, 1],
    willChange: 'transform'
  },
}

// Optimized hover effects
export const magneticHover = {
  hover: { 
    transform: 'scale(1.02)', // Reduced scale for better performance
    transition: { duration: 0.15 } 
  },
  tap: { transform: 'scale(0.98)' },
}

// Simplified line drawing
export const drawLine = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { 
    duration: 0.8, 
    ease: [0.22, 1, 0.36, 1],
    willChange: 'pathLength, opacity'
  },
}

export const countUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay: 0.2 }, // Reduced delay
}

// Simplified button morphing
export const morphButton = {
  initial: { borderRadius: "8px" },
  hover: { borderRadius: "16px", transition: { duration: 0.2 } }, // Reduced border radius
}

// Simplified glow effect
export const glowEffect = {
  initial: { boxShadow: "0 0 0 0 rgba(222, 131, 24, 0)" },
  hover: {
    boxShadow: "0 0 15px 3px rgba(222, 131, 24, 0.2)", // Reduced glow
    transition: { duration: 0.2 },
  },
}

// Performance-optimized variants
export const quickFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2, ease: 'easeOut' },
}

export const quickSlideUp = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 0.25, ease: 'easeOut' },
}

// Reduced motion safe variants with better performance
export const getMotionVariant = (variant: any, prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.1 }, // Faster for reduced motion
    }
  }
  return variant
}

// Batch animation variants for better performance
export const batchFadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    duration: 0.2,
    staggerChildren: 0.05,
    willChange: 'opacity'
  },
}

// Optimized stagger for large lists
export const optimizedStagger = {
  animate: {
    transition: {
      staggerChildren: 0.06, // Optimized timing
      delayChildren: 0.05,   // Reduced delay
    },
  },
}

// CSS-only animations for better performance
export const cssOnlyVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
  // Use CSS classes for animations when possible
  className: 'animate-fade-in'
}
