"use client"

import { useEffect } from "react"

export function ClientScripts() {
  useEffect(() => {
    // Load Google Analytics
    const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-DRDMMFDCHE"
    
    if (ga4Id) {
      // Load GA4 script
      const script = document.createElement("script")
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
      document.head.appendChild(script)

      // Initialize GA4
      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag("js", new Date())
      gtag("config", ga4Id, {
        page_title: document.title,
        page_location: window.location.href,
      })
      window.gtag = gtag
      
      console.log(`[GA4] Initialized with ID: ${ga4Id}`)
    }

    // Load Facebook Pixel
    if (process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
      const script = document.createElement("script")
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
        fbq('track', 'PageView');
      `
      document.head.appendChild(script)
    }
  }, [])

  return null
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}


