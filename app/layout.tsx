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
        {/* Cookiebot CMP - Load first for GDPR compliance */}
        <script 
          id="Cookiebot" 
          src="https://consent.cookiebot.com/uc.js?cbid=d8078c04-3ae5-433f-a612-a1d0824af6be" 
          data-blockingmode="auto" 
          data-debug="true"
          data-level="strict"
          data-type="optin"
          type="text/javascript"
        />
        
        {/* Debug script to check Cookiebot loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Debug Cookiebot loading - following official documentation
              console.log('Starting Cookiebot debug...');
              
              // Force consent popup for all users (including Ghana)
              window.addEventListener('CookiebotOnLoad', function() {
                console.log('✅ Cookiebot OnLoad event fired');
                console.log('Cookiebot object:', window.Cookiebot);
                console.log('Consent state:', window.Cookiebot?.consent);
                console.log('Has response:', window.Cookiebot?.hasResponse);
                console.log('Consented:', window.Cookiebot?.consented);
                console.log('Declined:', window.Cookiebot?.declined);
                
                // Force consent popup to show for all users, regardless of location
                if (window.Cookiebot && !window.Cookiebot.hasResponse) {
                  console.log('🔄 Forcing consent popup to show for all users...');
                  // Override geographic restrictions
                  window.Cookiebot.regulations.gdprApplies = true;
                  window.Cookiebot.isOutOfRegion = false;
                  window.Cookiebot.isOutsideEU = false;
                  // Show the banner
                  window.Cookiebot.show();
                } else if (window.Cookiebot && window.Cookiebot.hasResponse) {
                  console.log('ℹ️ User has already responded to cookie consent');
                }
              });
              
              // Listen for CookiebotOnConsentReady event (official event)
              window.addEventListener('CookiebotOnConsentReady', function() {
                console.log('✅ Cookiebot OnConsentReady event fired');
                console.log('Final consent state:', window.Cookiebot?.consent);
                console.log('Has response:', window.Cookiebot?.hasResponse);
              });
              
              // Listen for CookiebotOnAccept event
              window.addEventListener('CookiebotOnAccept', function() {
                console.log('✅ User accepted cookies');
              });
              
              // Listen for CookiebotOnDecline event
              window.addEventListener('CookiebotOnDecline', function() {
                console.log('✅ User declined cookies');
              });
              
              // Check Cookiebot status after page load
              window.addEventListener('load', function() {
                console.log('Page loaded, checking Cookiebot status...');
                console.log('Cookiebot loaded:', !!window.Cookiebot);
                
                if (window.Cookiebot) {
                  console.log('Consent object:', window.Cookiebot.consent);
                  console.log('Has response:', window.Cookiebot.hasResponse);
                  console.log('Consented:', window.Cookiebot.consented);
                  console.log('Declined:', window.Cookiebot.declined);
                  
                  // Force consent popup for all users (including Ghana)
                  if (!window.Cookiebot.hasResponse) {
                    console.log('🔄 Forcing consent popup to show for all users...');
                    // Override geographic restrictions
                    window.Cookiebot.regulations.gdprApplies = true;
                    window.Cookiebot.isOutOfRegion = false;
                    window.Cookiebot.isOutsideEU = false;
                    // Show the banner
                    window.Cookiebot.show();
                  } else {
                    console.log('ℹ️ User has already responded to cookie consent');
                    
                    // Add test button for development (only in development mode)
                    if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
                      const testButton = document.createElement('div');
                      testButton.innerHTML = \`
                        <div style="position: fixed; top: 10px; right: 10px; background: #1a1a1a; color: white; padding: 10px; border-radius: 5px; z-index: 10000; font-size: 12px;">
                          <button onclick="window.Cookiebot.renew();" style="background: #3b82f6; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 5px;">Test Consent</button>
                          <button onclick="window.Cookiebot.withdraw();" style="background: #ef4444; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 5px;">Withdraw</button>
                        </div>
                      \`;
                      document.body.appendChild(testButton);
                    }
                  }
                } else {
                  console.error('❌ Cookiebot failed to load - check domain configuration');
                  // Show fallback banner
                  setTimeout(function() {
                    const fallbackBanner = document.createElement('div');
                    fallbackBanner.innerHTML = \`
                      <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a; color: white; padding: 20px; text-align: center; z-index: 10000; border-top: 2px solid #3b82f6;">
                        <p style="margin: 0 0 15px 0;">This website uses cookies to ensure you get the best experience.</p>
                        <button onclick="this.parentElement.parentElement.remove(); localStorage.setItem('cookieConsent', 'accepted');" style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">Accept</button>
                        <button onclick="this.parentElement.parentElement.remove();" style="background: transparent; color: white; border: 1px solid white; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Decline</button>
                      </div>
                    \`;
                    document.body.appendChild(fallbackBanner);
                  }, 3000);
                }
              });
            `,
          }}
        />
        
        {/* Resource hints for performance optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics 4 - Configured to work with Cookiebot */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DRDMMFDCHE"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Initialize GA only after Cookiebot consent is ready
              window.addEventListener('CookiebotOnConsentReady', function () {
                console.log('🔧 Initializing Google Analytics after consent...');
                
                // Check if user consented to statistics cookies
                if (window.Cookiebot && window.Cookiebot.consent.statistics) {
                  gtag('js', new Date());
                  gtag('config', 'G-DRDMMFDCHE', {
                    page_title: document.title,
                    page_location: window.location.href,
                    anonymize_ip: true,
                    cookie_flags: 'secure;samesite=strict'
                  });
                  console.log('✅ Google Analytics initialized with consent');
                } else {
                  console.log('ℹ️ Google Analytics not initialized - user did not consent to statistics cookies');
                }
              });
              
              // Fallback initialization if Cookiebot doesn't load
              setTimeout(function() {
                if (!window.Cookiebot) {
                  console.log('⚠️ Cookiebot not loaded, initializing GA as fallback...');
                  gtag('js', new Date());
                  gtag('config', 'G-DRDMMFDCHE', {
                    page_title: document.title,
                    page_location: window.location.href,
                    anonymize_ip: true,
                    cookie_flags: 'secure;samesite=strict'
                  });
                }
              }, 5000);
            `,
          }}
        />
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