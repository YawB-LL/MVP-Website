"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function TestToastPage() {
  const { toast } = useToast()

  const showSuccessToast = () => {
    toast({
      variant: "success",
      title: "Success!",
      description: "This is a success toast notification.",
    })
  }

  const showErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "This is an error toast notification.",
    })
  }

  const showDefaultToast = () => {
    toast({
      title: "Default",
      description: "This is a default toast notification.",
    })
  }

  return (
    <div className="min-h-screen bg-base text-text p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center">Toast Test Page</h1>
        <p className="text-center text-text-secondary">
          Test the toast notification system
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={showSuccessToast} className="bg-green-600 hover:bg-green-700">
            Show Success Toast
          </Button>
          <Button onClick={showErrorToast} className="bg-red-600 hover:bg-red-700">
            Show Error Toast
          </Button>
          <Button onClick={showDefaultToast} variant="outline">
            Show Default Toast
          </Button>
        </div>

        <div className="text-center text-sm text-text-secondary">
          <p>Click the buttons above to test different toast types.</p>
          <p>Toasts should appear in the top-right corner of the screen.</p>
        </div>
      </div>
    </div>
  )
}
