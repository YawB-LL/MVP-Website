import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Cookie Declaration - LandLedger',
  description: 'Detailed information about cookies used on LandLedger platform',
};

export default function CookieDeclarationPage() {
  return (
    <div className="min-h-screen bg-base text-text">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Cookie Declaration
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg mb-6">
              This page provides detailed information about the cookies used on our website. 
              You can manage your cookie preferences using the controls below.
            </p>
            
            <div className="bg-card p-6 rounded-lg border mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookie Consent Management</h2>
              <p className="mb-4">
                We use Cookiebot to manage cookie consent and ensure compliance with privacy regulations. 
                The cookie declaration below shows all cookies used on our website.
              </p>
              <p className="text-sm text-muted-foreground">
                If you need to change your cookie preferences, you can do so at any time using the 
                privacy settings button in our footer.
              </p>
            </div>
          </div>
          
          {/* Cookiebot Declaration Script */}
          <Script
            id="CookieDeclaration"
            src="https://consent.cookiebot.com/d8078c04-3ae5-433f-a612-a1d0824af6be/cd.js"
            type="text/javascript"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </div>
  );
}


