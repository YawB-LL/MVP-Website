import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText } from 'lucide-react'

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <FileText className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-text mb-4">Post Not Found</h1>
          <p className="text-text-secondary mb-8">
            The blog post you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/#blog">
            <Button className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
