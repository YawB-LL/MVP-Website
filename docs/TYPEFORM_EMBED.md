# Enhanced Modal & Typeform Integration Guide

This guide covers the enhanced modal system and typeform integration that provides a premium, mobile-first user experience.

## Overview

The enhanced modal system includes:
- **Sophisticated backdrop** with blur effects and click-to-close
- **Mobile-first responsive design** with bottom sheet behavior on mobile
- **Swipe-to-close gestures** for mobile devices
- **Enhanced accessibility** with keyboard navigation and screen reader support
- **Professional loading states** and error handling
- **Seamless typeform integration** with optimized performance

## Modal Component

### Basic Usage

```tsx
import { Modal } from "@/components/ui/modal"

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="My Modal"
      description="Optional description text"
    >
      <div>Your content here</div>
    </Modal>
  )
}
```

### Enhanced Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility |
| `onClose` | `() => void` | - | Called when modal closes |
| `title` | `string` | - | Modal title |
| `description` | `string` | - | Optional description |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full" \| "typeform"` | `"lg"` | Modal size preset |
| `showCloseButton` | `boolean` | `true` | Show close button |
| `showBackdrop` | `boolean` | `true` | Show backdrop |
| `closeOnBackdropClick` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on ESC key |
| `enableSwipeToClose` | `boolean` | `true` | Enable swipe-to-close on mobile |
| `loading` | `boolean` | `false` | Show loading state |
| `error` | `string \| null` | `null` | Show error state |

### Size Presets

- **`sm`**: `max-w-md` - Small modal
- **`md`**: `max-w-lg` - Medium modal  
- **`lg`**: `max-w-2xl` - Large modal (default)
- **`xl`**: `max-w-4xl` - Extra large modal
- **`full`**: `max-w-7xl` - Full width modal
- **`typeform`**: Optimized for typeform embedding with responsive sizing

## Typeform Integration

### Basic Typeform Modal

```tsx
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"

function TypeformModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Contact Us"
      description="We'd love to hear from you"
      size="typeform"
    >
      <TypeformEmbed
        formId="YOUR_FORM_ID"
        onClose={() => setIsOpen(false)}
      />
    </Modal>
  )
}
```

### Enhanced TypeformEmbed Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `formId` | `string` | - | Typeform form ID |
| `title` | `string` | - | Optional form title |
| `description` | `string` | - | Optional form description |
| `onClose` | `() => void` | - | Called when form closes |
| `onReady` | `() => void` | - | Called when form is ready |
| `onSubmit` | `(data: any) => void` | - | Called on form submission |
| `onError` | `(error: any) => void` | - | Called on form error |
| `height` | `string \| number` | `"600px"` | Form height |
| `autoResize` | `boolean` | `true` | Auto-resize form |
| `enableSandbox` | `boolean` | `false` | Enable sandbox mode |
| `hideHeaders` | `boolean` | `false` | Hide typeform headers |
| `hideFooter` | `boolean` | `false` | Hide typeform footer |
| `disableAutoFocus` | `boolean` | `true` | Disable auto-focus |
| `opacity` | `number` | `0` | Form opacity |

## Complete Example Component

```tsx
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { TypeformEmbed } from "@/components/ui/typeform-embed"
import { Button } from "@/components/ui/button"

export function ContactFormModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpen = () => {
    setIsOpen(true)
    setIsLoading(true)
    setError(null)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsLoading(false)
    setError(null)
  }

  const handleFormReady = () => {
    setIsLoading(false)
  }

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data)
    // Handle form submission
    setTimeout(() => handleClose(), 1500)
  }

  const handleFormError = (error: any) => {
    console.error("Form error:", error)
    setError(error?.message || "Failed to load form")
    setIsLoading(false)
  }

  return (
    <>
      <Button onClick={handleOpen}>
        Contact Us
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Contact Us"
        description="We'd love to hear from you. Please fill out the form below."
        size="typeform"
        loading={isLoading}
        error={error}
      >
        <TypeformEmbed
          formId="YOUR_FORM_ID"
          onReady={handleFormReady}
          onSubmit={handleFormSubmit}
          onError={handleFormError}
          onClose={handleClose}
        />
      </Modal>
    </>
  )
}
```

## Mobile-First Features

### Responsive Behavior

- **Mobile (< 768px)**: Bottom sheet style with swipe-to-close
- **Tablet (768px - 1024px)**: Centered modal with scale animation
- **Desktop (> 1024px)**: Traditional modal with zoom animation

### Touch Interactions

- **Swipe to close**: Swipe down on mobile to dismiss
- **Touch-friendly buttons**: Minimum 44px touch targets
- **Smooth animations**: Optimized for mobile performance

### Mobile Optimizations

- **Safe areas**: Respects device safe areas
- **Keyboard handling**: Proper virtual keyboard behavior
- **Orientation support**: Graceful portrait/landscape transitions
- **Performance**: Optimized rendering for mobile browsers

## Accessibility Features

### Keyboard Navigation

- **ESC key**: Close modal
- **Tab navigation**: Focus trapping within modal
- **Focus restoration**: Restore focus when modal closes

### Screen Reader Support

- **ARIA labels**: Proper labeling for all interactive elements
- **Announcements**: Screen reader announcements for state changes
- **Semantic structure**: Proper heading hierarchy

### Reduced Motion

- **Respects preferences**: Automatically detects `prefers-reduced-motion`
- **Instant transitions**: No animations when motion is reduced
- **Accessible animations**: Smooth, non-disorienting animations

## Animation System

### Timing & Easing

- **Enter**: 300ms with `ease-out` for welcoming feel
- **Exit**: 200ms with `ease-in` for quick dismissal
- **Backdrop**: 250ms fade in/out
- **Micro-interactions**: 150ms for hover states

### Animation Types

- **Mobile**: Slide up from bottom
- **Desktop**: Scale animation from center
- **Backdrop**: Fade in/out with blur
- **Loading**: Spinning with ping effect

## Error Handling

### Loading States

```tsx
<Modal loading={true}>
  {/* Shows professional loading spinner */}
</Modal>
```

### Error States

```tsx
<Modal error="Failed to load form">
  {/* Shows error message with retry button */}
</Modal>
```

### Form Error Handling

```tsx
const handleFormError = (error: any) => {
  setError(error?.message || "Failed to load form")
  setIsLoading(false)
}
```

## Performance Optimizations

### Lazy Loading

- **Intersection observer**: Load typeform when modal opens
- **Efficient rendering**: Optimized for mobile browsers
- **Memory management**: Proper cleanup on unmount

### Mobile Performance

- **Touch optimization**: Efficient touch event handling
- **Smooth scrolling**: Optimized scroll performance
- **Reduced repaints**: Efficient DOM updates

## Best Practices

### Modal Usage

1. **Clear purpose**: Use descriptive titles and descriptions
2. **Consistent sizing**: Use appropriate size presets
3. **Accessible**: Always provide keyboard and screen reader support
4. **Mobile-first**: Test on mobile devices first

### Typeform Integration

1. **Form validation**: Handle form errors gracefully
2. **Loading states**: Show loading indicators
3. **Success feedback**: Provide clear success messages
4. **Analytics**: Track form interactions and completions

### Performance

1. **Lazy load**: Load typeform only when needed
2. **Error boundaries**: Handle errors gracefully
3. **Memory cleanup**: Proper event listener cleanup
4. **Mobile testing**: Test on various mobile devices

## Troubleshooting

### Common Issues

**Modal not opening**
- Check `isOpen` state
- Verify event handlers are properly bound
- Check for console errors

**Typeform not loading**
- Verify form ID is correct
- Check network connectivity
- Verify typeform is published and accessible

**Mobile issues**
- Test on actual mobile devices
- Check viewport meta tag
- Verify touch event handling

**Accessibility issues**
- Test with screen readers
- Verify keyboard navigation
- Check ARIA labels

### Debug Mode

Enable debug logging:

```tsx
const handleFormError = (error: any) => {
  console.log("Form error details:", error)
  setError(error?.message || "Failed to load form")
}
```

## Migration Guide

### From Basic Modal

1. **Update imports**: Import enhanced modal components
2. **Add new props**: Include loading, error, and accessibility props
3. **Test mobile**: Verify mobile behavior works correctly
4. **Update styling**: Use new size presets and styling

### From Basic Typeform

1. **Update component**: Use enhanced TypeformEmbed
2. **Add error handling**: Implement proper error states
3. **Add loading states**: Show loading indicators
4. **Test accessibility**: Verify keyboard and screen reader support

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review console errors
3. Test on different devices and browsers
4. Verify typeform configuration

The enhanced modal system provides a premium, accessible, and mobile-first experience for typeform integration while maintaining consistency with your application's design system.
