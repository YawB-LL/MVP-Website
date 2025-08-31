import dynamic from 'next/dynamic'

// Dynamic imports for non-critical components to reduce initial bundle size
// These components will be loaded only when needed

// Blog section - loaded dynamically since it's below the fold
export const DynamicBlog = dynamic(
  () => import('@/components/sections/blog').then(mod => ({ default: mod.Blog })),
  {
    loading: () => (
      <div className="py-24 bg-base">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-12 bg-white/10 rounded mb-8 max-w-2xl mx-auto" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6">
                  <div className="h-48 bg-white/10 rounded mb-4" />
                  <div className="h-6 bg-white/10 rounded mb-2" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false, // Disable SSR for better performance
  }
)

// Blog preview section - loaded dynamically for homepage
export const DynamicBlogPreview = dynamic(
  () => import('@/components/sections/blog-preview').then(mod => ({ default: mod.BlogPreview })),
  {
    loading: () => (
      <div className="py-24 bg-base">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-12 bg-white/10 rounded mb-8 max-w-2xl mx-auto" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6">
                  <div className="h-48 bg-white/10 rounded mb-4" />
                  <div className="h-6 bg-white/10 rounded mb-2" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
)

// Press section - loaded dynamically
export const DynamicPress = dynamic(
  () => import('@/components/sections/press').then(mod => ({ default: mod.Press })),
  {
    loading: () => (
      <div className="py-24 bg-base">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-12 bg-white/10 rounded mb-8 max-w-2xl mx-auto" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 text-center">
                  <div className="h-24 bg-white/10 rounded mb-4" />
                  <div className="h-6 bg-white/10 rounded mb-2" />
                  <div className="h-4 bg-white/10 rounded w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
)

// Careers section - loaded dynamically
export const DynamicCareers = dynamic(
  () => import('@/components/sections/careers').then(mod => ({ default: mod.Careers })),
  {
    loading: () => (
      <div className="py-24 bg-base">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-12 bg-white/10 rounded mb-8 max-w-2xl mx-auto" />
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6">
                  <div className="h-6 bg-white/10 rounded mb-4" />
                  <div className="h-4 bg-white/10 rounded mb-2" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
)

// Contact section - loaded dynamically
export const DynamicContact = dynamic(
  () => import('@/components/sections/contact').then(mod => ({ default: mod.Contact })),
  {
    loading: () => (
      <div className="py-24 bg-base">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-12 bg-white/10 rounded mb-8 max-w-2xl mx-auto" />
            <div className="max-w-2xl mx-auto">
              <div className="h-16 bg-white/10 rounded mb-4" />
              <div className="h-16 bg-white/10 rounded mb-4" />
              <div className="h-32 bg-white/10 rounded mb-6" />
              <div className="h-12 bg-white/10 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
)

// Footer - loaded dynamically since it's at the bottom
export const DynamicFooter = dynamic(
  () => import('@/components/sections/footer').then(mod => ({ default: mod.Footer })),
  {
    loading: () => (
      <footer className="py-12 bg-base border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-6 max-w-md" />
            <div className="grid md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-6 bg-white/10 rounded" />
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    ),
    ssr: false,
  }
)

// Exit intent popup - loaded dynamically since it's not immediately visible
export const DynamicExitIntentPopup = dynamic(
  () => import('@/components/ui/exit-intent-popup').then(mod => ({ default: mod.ExitIntentPopup })),
  {
    loading: () => null, // No loading state for popup
    ssr: false,
  }
)

// Scroll progress - loaded dynamically
export const DynamicScrollProgress = dynamic(
  () => import('@/components/ui/scroll-progress').then(mod => ({ default: mod.ScrollProgress })),
  {
    loading: () => null,
    ssr: false,
  }
)
