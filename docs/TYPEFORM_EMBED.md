# TypeformEmbed Component Documentation

A professional, production-ready Typeform embed component for Next.js applications with comprehensive error handling, loading states, and accessibility features.

## 🚀 Features

- **Professional Embedding**: Seamlessly integrates Typeform into your Next.js app
- **Error Handling**: Comprehensive error handling with retry mechanisms
- **Loading States**: Beautiful loading animations and user feedback
- **Responsive Design**: Automatically adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Memory Management**: Proper cleanup to prevent memory leaks
- **TypeScript Support**: Full TypeScript support with proper type definitions
- **Customization**: Extensive customization options for styling and behavior

## 📦 Installation

The component is already included in your project at `components/ui/typeform-embed.tsx`.

## 🎯 Basic Usage

```tsx
import { TypeformEmbed } from "@/components/ui/typeform-embed"

export default function MyPage() {
  return (
    <TypeformEmbed
      formId="01K38AHCG70RKEZGD0P5KH7CBY"
      height={600}
      onSubmission={(data) => console.log("Form submitted:", data)}
    />
  )
}
```

## ⚙️ Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `formId` | `string` | Your Typeform form ID |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | `number` | `600` | Height of the form in pixels |
| `width` | `string \| number` | `"100%"` | Width of the form |
| `className` | `string` | `""` | Additional CSS classes |
| `onSubmission` | `(data: any) => void` | `undefined` | Callback when form is submitted |
| `onReady` | `() => void` | `undefined` | Callback when form is ready |
| `onError` | `(error: Error) => void` | `undefined` | Callback when an error occurs |
| `showBranding` | `boolean` | `false` | Show Typeform branding |
| `hideHeaders` | `boolean` | `true` | Hide form headers |
| `hideFooter` | `boolean` | `true` | Hide form footer |
| `opacity` | `number` | `0` | Form opacity (0-1) |
| `disableAutoFocus` | `boolean` | `true` | Disable auto-focus on first field |
| `enableSandbox` | `boolean` | `false` | Enable sandbox mode |
| `autoResize` | `boolean` | `true` | Auto-resize on window resize |
| `fullScreen` | `boolean` | `false` | Enable full-screen mode |

## 🔧 Advanced Usage Examples

### 1. Basic Form with Event Handlers

```tsx
import { TypeformEmbed } from "@/components/ui/typeform-embed"

export default function WaitlistPage() {
  const handleSubmission = (data: any) => {
    console.log("User submitted:", data)
    // Send to your API
    // Track analytics
    // Show success message
  }

  const handleFormReady = () => {
    console.log("Form is ready for users")
  }

  const handleFormError = (error: Error) => {
    console.error("Form error:", error)
    // Log error to monitoring service
  }

  return (
    <TypeformEmbed
      formId="01K38AHCG70RKEZGD0P5KH7CBY"
      height={600}
      onSubmission={handleSubmission}
      onReady={handleFormReady}
      onError={handleFormError}
    />
  )
}
```

### 2. Customized Styling

```tsx
<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  height={700}
  width="90%"
  className="mx-auto rounded-2xl shadow-2xl"
  showBranding={false}
  hideHeaders={true}
  hideFooter={true}
  opacity={0}
  disableAutoFocus={true}
  autoResize={true}
/>
```

### 3. Full-Screen Modal

```tsx
import { useState } from "react"
import { TypeformEmbed } from "@/components/ui/typeform-embed"

export default function ModalForm() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2>Join Our Waitlist</h2>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            <TypeformEmbed
              formId="01K38AHCG70RKEZGD0P5KH7CBY"
              height={600}
              fullScreen={false}
              onSubmission={(data) => {
                console.log("Submitted:", data)
                setIsOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
```

### 4. Responsive Design

```tsx
<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  height={window.innerWidth < 768 ? 400 : 600}
  width="100%"
  autoResize={true}
  className="w-full max-w-4xl mx-auto"
/>
```

## 🎨 Styling and Customization

### Default Styling

The component uses your existing design system:
- **Primary Color**: `text-primary` (your brand color)
- **Background**: `bg-base` (your base background)
- **Borders**: `border-white/10` (subtle white borders)
- **Text**: `text-text` and `text-text-secondary`

### Custom Styling

```tsx
<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  className="
    custom-form-container
    border-2 border-blue-500
    rounded-3xl
    shadow-blue-500/20
  "
/>
```

### CSS Customization

```css
/* Custom styles for the form container */
.custom-form-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Style the loading state */
.custom-form-container .loading-state {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
```

## 🚨 Error Handling

The component includes comprehensive error handling:

### Automatic Retry
- Attempts to reload the form up to 3 times
- Configurable retry delay (default: 2 seconds)
- User-friendly retry button

### Error States
- Script loading failures
- Widget creation errors
- Network issues
- Typeform API errors

### Error Callbacks
```tsx
<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  onError={(error) => {
    // Log to monitoring service
    console.error("Typeform error:", error)
    
    // Show user-friendly message
    toast.error("Unable to load form. Please try again.")
    
    // Track error analytics
    analytics.track("typeform_error", { error: error.message })
  }}
/>
```

## 📱 Responsive Behavior

### Auto-Resize
```tsx
<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  autoResize={true}
  height={600}
/>
```

### Mobile Optimization
```tsx
const [formHeight, setFormHeight] = useState(600)

useEffect(() => {
  const updateHeight = () => {
    if (window.innerWidth < 768) {
      setFormHeight(400) // Mobile
    } else if (window.innerWidth < 1024) {
      setFormHeight(500) // Tablet
    } else {
      setFormHeight(600) // Desktop
    }
  }

  updateHeight()
  window.addEventListener('resize', updateHeight)
  return () => window.removeEventListener('resize', updateHeight)
}, [])

<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  height={formHeight}
  autoResize={true}
/>
```

## 🔒 Security Considerations

### Content Security Policy (CSP)
Add to your `next.config.js`:

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-inline' https://embed.typeform.com; frame-src https://form.typeform.com;"
          }
        ]
      }
    ]
  }
}
```

### Environment Variables
```env
# Typeform Configuration
TYPEFORM_API_TOKEN=your_api_token_here
TYPEFORM_WAITLIST_FORM_ID=01K38AHCG70RKEZGD0P5KH7CBY
```

## 📊 Analytics Integration

### Google Analytics
```tsx
<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  onSubmission={(data) => {
    // Track form submission
    gtag('event', 'form_submit', {
      form_name: 'waitlist',
      form_id: '01K38AHCG70RKEZGD0P5KH7CBY'
    })
  }}
  onReady={() => {
    // Track form view
    gtag('event', 'form_view', {
      form_name: 'waitlist',
      form_id: '01K38AHCG70RKEZGD0P5KH7CBY'
    })
  }}
/>
```

### Custom Analytics
```tsx
const trackFormEvent = (eventName: string, data?: any) => {
  // Your analytics implementation
  analytics.track(eventName, {
    form_id: '01K38AHCG70RKEZGD0P5KH7CBY',
    timestamp: new Date().toISOString(),
    ...data
  })
}

<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  onSubmission={(data) => trackFormEvent('waitlist_submitted', data)}
  onReady={() => trackFormEvent('waitlist_loaded')}
  onError={(error) => trackFormEvent('waitlist_error', { error: error.message })}
/>
```

## 🧪 Testing

### Unit Tests
```tsx
import { render, screen, waitFor } from '@testing-library/react'
import { TypeformEmbed } from '@/components/ui/typeform-embed'

describe('TypeformEmbed', () => {
  it('shows loading state initially', () => {
    render(<TypeformEmbed formId="test-form" />)
    expect(screen.getByText('Loading waitlist form...')).toBeInTheDocument()
  })

  it('handles errors gracefully', async () => {
    const mockError = jest.fn()
    render(
      <TypeformEmbed 
        formId="invalid-form" 
        onError={mockError}
      />
    )
    
    await waitFor(() => {
      expect(mockError).toHaveBeenCalled()
    })
  })
})
```

### Integration Tests
```tsx
it('submits form data correctly', async () => {
  const mockSubmission = jest.fn()
  render(
    <TypeformEmbed 
      formId="01K38AHCG70RKEZGD0P5KH7CBY"
      onSubmission={mockSubmission}
    />
  )
  
  // Wait for form to load
  await waitFor(() => {
    expect(screen.queryByText('Loading waitlist form...')).not.toBeInTheDocument()
  })
  
  // Simulate form submission
  // Note: This would require mocking the Typeform API
})
```

## 🚀 Performance Optimization

### Lazy Loading
```tsx
import dynamic from 'next/dynamic'

const TypeformEmbed = dynamic(
  () => import('@/components/ui/typeform-embed').then(mod => ({ default: mod.TypeformEmbed })),
  {
    loading: () => <div>Loading form...</div>,
    ssr: false // Disable SSR for Typeform
  }
)
```

### Preloading
```tsx
// In your _app.tsx or layout
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="preload" href="//embed.typeform.com/next/embed.js" as="script" />
      </Head>
      {children}
    </>
  )
}
```

## 🔧 Troubleshooting

### Common Issues

1. **Form not loading**
   - Check if form ID is correct
   - Verify network connectivity
   - Check browser console for errors

2. **Script loading errors**
   - Ensure CSP allows Typeform domains
   - Check if script is blocked by ad blockers
   - Verify HTTPS is enabled

3. **Styling issues**
   - Check if CSS classes are properly applied
   - Verify Tailwind CSS is working
   - Check for CSS conflicts

### Debug Mode
```tsx
<TypeformEmbed
  formId="01K38AHCG70RKEZGD0P5KH7CBY"
  onError={(error) => {
    console.group('Typeform Debug Info')
    console.log('Error:', error)
    console.log('Form ID:', '01K38AHCG70RKEZGD0P5KH7CBY')
    console.log('User Agent:', navigator.userAgent)
    console.log('Timestamp:', new Date().toISOString())
    console.groupEnd()
  }}
/>
```

## 📚 Additional Resources

- [Typeform API Documentation](https://developer.typeform.com/)
- [Typeform Embed Options](https://developer.typeform.com/embed/)
- [Next.js Script Component](https://nextjs.org/docs/basic-features/script)
- [React useEffect Cleanup](https://react.dev/reference/react/useEffect#cleanup)

## 🤝 Contributing

To improve this component:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This component is part of your LandLedger project and follows the same license terms.
