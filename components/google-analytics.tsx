'use client';

import Script from 'next/script';
import { ConsentAwareScript } from '@/components/consent-aware-script';

export function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics 4 - Only loads with statistics consent */}
      <ConsentAwareScript
        src="https://www.googletagmanager.com/gtag/js?id=G-DRDMMFDCHE"
        category="statistics"
        strategy="afterInteractive"
        id="google-analytics-gtag"
      />
      
      <ConsentAwareScript
        id="google-analytics-config"
        category="statistics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Initialize GA4
            gtag('js', new Date());
            gtag('config', 'G-DRDMMFDCHE', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              cookie_flags: 'secure;samesite=strict'
            });
            
            console.log('✅ Google Analytics initialized with consent');
          `,
        }}
      />
    </>
  );
}
