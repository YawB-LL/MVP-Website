'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/hooks/use-cookie-consent';

export type CookieCategory = 'preferences' | 'statistics' | 'marketing';

interface ConsentAwareScriptProps {
  src?: string;
  category: CookieCategory;
  onLoad?: () => void;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  id?: string;
  [key: string]: any;
}

export function ConsentAwareScript({
  src,
  category,
  onLoad,
  strategy = 'afterInteractive',
  id,
  ...props
}: ConsentAwareScriptProps) {
  const { consent, isLoading } = useCookieConsent();

  // Don't render if still loading or user hasn't consented to this category
  if (isLoading || !consent[category]) {
    return null;
  }

  return (
    <Script
      src={src}
      onLoad={onLoad}
      strategy={strategy}
      id={id}
      {...props}
    />
  );
}
