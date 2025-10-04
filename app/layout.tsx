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
        {/* Cookiebot CMP - Direct implementation for localhost testing */}
        <script 
          id="Cookiebot" 
          src="https://consent.cookiebot.com/uc.js?cbid=d8078c04-3ae5-433f-a612-a1d0824af6be" 
          data-blockingmode="auto" 
          data-debug="true"
          data-level="strict"
          data-type="optin"
          type="text/javascript"
        />
        
        {/* Enhanced debug script for localhost testing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('🔧 Cookiebot debug script loaded');
              
              let popupAttempted = false;
              
              // Force consent popup for localhost testing
              function forceConsentPopup() {
                if (popupAttempted) return;
                popupAttempted = true;
                
                console.log('🔄 Attempting to force consent popup...');
                
                if (window.Cookiebot) {
                  console.log('✅ Cookiebot object found');
                  console.log('Current state:', {
                    hasResponse: window.Cookiebot.hasResponse,
                    consented: window.Cookiebot.consented,
                    declined: window.Cookiebot.declined,
                    isOutOfRegion: window.Cookiebot.isOutOfRegion,
                    isOutsideEU: window.Cookiebot.isOutsideEU,
                    regulations: window.Cookiebot.regulations
                  });
                  
                  // Clear any existing consent
                  try {
                    window.Cookiebot.deleteConsentCookie();
                    console.log('🗑️ Cleared existing consent cookie');
                  } catch (e) {
                    console.log('⚠️ Could not clear consent cookie:', e);
                  }
                  
                  // Override geographic restrictions for localhost testing
                  window.Cookiebot.regulations.gdprApplies = true;
                  window.Cookiebot.isOutOfRegion = false;
                  window.Cookiebot.isOutsideEU = false;
                  window.Cookiebot.hasResponse = false;
                  window.Cookiebot.consented = false;
                  window.Cookiebot.declined = false;
                  
                  console.log('🌍 Override geographic restrictions for localhost');
                  
                  // Force show banner
                  try {
                    window.Cookiebot.show();
                    console.log('🔄 Called Cookiebot.show()');
                  } catch (e) {
                    console.log('❌ Error calling Cookiebot.show():', e);
                  }
                } else {
                  console.log('❌ Cookiebot object not found');
                }
              }
              
              // Try when Cookiebot loads
              window.addEventListener('CookiebotOnLoad', function() {
                console.log('✅ Cookiebot OnLoad event fired');
                console.log('Cookiebot object:', window.Cookiebot);
                setTimeout(forceConsentPopup, 500);
              });
              
              // Listen for consent events
              window.addEventListener('CookiebotOnAccept', function() {
                console.log('✅ User accepted cookies');
              });
              
              window.addEventListener('CookiebotOnDecline', function() {
                console.log('✅ User declined cookies');
              });
              
              window.addEventListener('CookiebotOnConsentReady', function() {
                console.log('✅ Cookiebot consent ready');
                console.log('Final consent state:', window.Cookiebot?.consent);
              });
              
              // Fallback: Create custom banner if Cookiebot doesn't work
              setTimeout(function() {
                if (!window.Cookiebot || !window.Cookiebot.hasResponse) {
                  console.log('🚨 Creating fallback consent banner...');
                  const fallbackBanner = document.createElement('div');
                  fallbackBanner.innerHTML = \`
                    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a; color: white; padding: 20px; text-align: center; z-index: 10000; border-top: 2px solid #3b82f6; font-family: Arial, sans-serif;">
                      <h3 style="margin: 0 0 10px 0; font-size: 18px;">🍪 Cookie Consent Required</h3>
                      <p style="margin: 0 0 15px 0; font-size: 14px;">This website uses cookies. Please accept to continue.</p>
                      <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="
                          localStorage.setItem('cookieConsent', 'accepted');
                          this.closest('div').remove();
                          console.log('✅ Fallback consent accepted');
                        " style="background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">Accept All</button>
                        <button onclick="
                          localStorage.setItem('cookieConsent', 'necessary');
                          this.closest('div').remove();
                          console.log('✅ Fallback consent - necessary only');
                        " style="background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">Necessary Only</button>
                      </div>
                    </div>
                  \`;
                  document.body.appendChild(fallbackBanner);
                }
              }, 8000);
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