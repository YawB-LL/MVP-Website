import type React from "react"
import type { Metadata } from "next"
import { Inter, Newsreader } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/sections/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ClientScripts } from "@/components/client-scripts"
import { TrackingInitializer } from "@/components/tracking-initializer"
import { PathTracker } from "@/components/layout/path-tracker"
// import { CookiebotProvider } from "react-cookiebot"
import { GoogleAnalytics } from "@/components/google-analytics"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  // Remove fallback fonts to prevent font override issues
})

export const metadata: Metadata = {
  title: "LandLedger - Premium Ghana Real Estate Investment Platform",
  description:
    "Invest in premium Ghana real estate through tokenized properties. Transparent, regulated, and accessible to both local and diaspora investors.",
  generator: "LandLedger",
  keywords: "Ghana real estate, property investment, tokenization, diaspora investment, land investment",
  authors: [{ name: "LandLedger" }],
  openGraph: {
    title: "Ghana's First Tokenised Real Estate Platform",
    description: "Unlock access to prime Ghanaian real estate, transparent, secure, and built for Ghanaians across the globe.",
    type: "website",
    locale: "en_GB",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Cookiebot CMP - Official Dashboard Implementation */}
        <script 
          id="Cookiebot" 
          src="https://consent.cookiebot.com/uc.js" 
          data-cbid="d8078c04-3ae5-433f-a612-a1d0824af6be" 
          data-blockingmode="auto" 
          type="text/javascript"
        />
        
        {/* Cookiebot Analytics Integration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Cookiebot analytics integration for LandLedger
              console.log('🍪 Cookiebot integration loaded for landledger.africa');
              
              // Simple, direct approach to force banner
              function forceBanner() {
                console.log('🚀 FORCE BANNER: Starting banner forcing process...');
                
                if (window.Cookiebot) {
                  console.log('✅ Cookiebot object found, proceeding...');
                  
                  // Clear existing consent
                  try {
                    window.Cookiebot.deleteConsentCookie();
                    console.log('🗑️ Cleared existing consent cookie');
                  } catch (e) {
                    console.log('⚠️ Could not clear consent cookie:', e);
                  }
                  
                  // Override geographic detection
                  window.Cookiebot.regulations.gdprApplies = true;
                  window.Cookiebot.regulations.ccpaApplies = true;
                  window.Cookiebot.regulations.lgpdApplies = true;
                  window.Cookiebot.isOutOfRegion = false;
                  window.Cookiebot.isOutsideEU = false;
                  
                  // Reset consent state
                  window.Cookiebot.hasResponse = false;
                  window.Cookiebot.consented = false;
                  window.Cookiebot.declined = false;
                  
                  console.log('🌍 Geographic restrictions overridden');
                  console.log('🔄 Consent state reset');
                  
                  // Force show banner
                  try {
                    window.Cookiebot.show();
                    console.log('🔄 Called Cookiebot.show()');
                    
                    // Check if banner appeared
                    setTimeout(() => {
                      const banner = document.querySelector('#CybotCookiebotDialog');
                      const bannerActive = document.querySelector('#CybotCookiebotDialogActive');
                      
                      if (banner || bannerActive) {
                        console.log('✅ SUCCESS: Cookiebot banner is visible!');
                      } else {
                        console.log('❌ FAILED: Banner not visible after show() call');
                      }
                    }, 2000);
                  } catch (e) {
                    console.log('❌ Error calling Cookiebot.show():', e);
                  }
                } else {
                  console.log('❌ Cookiebot object not available');
                }
              }
              
              // Try immediately when script loads
              setTimeout(forceBanner, 1000);
              
              // Also try when Cookiebot loads
              window.addEventListener('CookiebotOnLoad', function() {
                console.log('✅ Cookiebot OnLoad event fired');
                setTimeout(forceBanner, 500);
              });
              
              // Also try on window load
              window.addEventListener('load', function() {
                console.log('🔄 Window loaded');
                setTimeout(forceBanner, 2000);
              });
              
              // Track consent events for analytics
              window.addEventListener('CookiebotOnAccept', function() {
                console.log('✅ User accepted cookies');
                if (window.gtag) {
                  window.gtag('event', 'cookie_consent', {
                    event_category: 'privacy',
                    event_label: 'accepted',
                    value: 1
                  });
                }
              });
              
              window.addEventListener('CookiebotOnDecline', function() {
                console.log('✅ User declined cookies');
                if (window.gtag) {
                  window.gtag('event', 'cookie_consent', {
                    event_category: 'privacy',
                    event_label: 'declined',
                    value: 0
                  });
                }
              });
              
              window.addEventListener('CookiebotOnConsentReady', function() {
                console.log('✅ Cookiebot consent ready');
                if (window.Cookiebot && window.Cookiebot.consent.statistics) {
                  console.log('📊 Statistics consent granted - analytics enabled');
                }
              });
            `,
          }}
        />
        
        {/* Resource hints for performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-base text-text font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClientScripts />
          <TrackingInitializer />
          {/* <GoogleAnalytics /> */}
          <PathTracker />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}