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