'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, RefreshCw } from 'lucide-react';

export default function TestCookiebotPage() {
  const [cookiebotStatus, setCookiebotStatus] = useState('Checking...');
  const [consentState, setConsentState] = useState<any>(null);

  useEffect(() => {
    // Debug Cookiebot loading
    console.log('Testing Cookiebot on localhost...');
    
    const checkCookiebot = () => {
      if (typeof window !== 'undefined' && window.Cookiebot) {
        console.log('✅ Cookiebot loaded successfully');
        console.log('Cookiebot object:', window.Cookiebot);
        console.log('Consent state:', window.Cookiebot.consent);
        console.log('Has response:', window.Cookiebot.hasResponse);
        
        setCookiebotStatus('✅ Loaded');
        setConsentState({
          necessary: window.Cookiebot.consent.necessary,
          preferences: window.Cookiebot.consent.preferences,
          statistics: window.Cookiebot.consent.statistics,
          marketing: window.Cookiebot.consent.marketing,
          hasResponse: window.Cookiebot.hasResponse,
          consented: window.Cookiebot.consented,
          declined: window.Cookiebot.declined,
        });
        
        // Force show banner for testing
        if (!window.Cookiebot.hasResponse) {
          console.log('🔄 Forcing consent banner to show...');
          window.Cookiebot.show();
        }
      } else {
        console.log('❌ Cookiebot not loaded yet, retrying...');
        setCookiebotStatus('❌ Not loaded');
        setTimeout(checkCookiebot, 1000);
      }
    };

    // Check immediately and after a delay
    checkCookiebot();
    setTimeout(checkCookiebot, 2000);
  }, []);

  const handleShowBanner = () => {
    if (typeof window !== 'undefined' && window.Cookiebot) {
      console.log('🔄 Manual show banner triggered');
      window.Cookiebot.show();
    } else {
      console.log('❌ Cookiebot not available for manual show');
    }
  };

  const handleRenewConsent = () => {
    if (typeof window !== 'undefined' && window.Cookiebot) {
      console.log('🔄 Manual renew consent triggered');
      window.Cookiebot.renew();
    } else {
      console.log('❌ Cookiebot not available for manual renew');
    }
  };

  const handleForcePopup = () => {
    console.log('🚨 Force popup triggered');
    
    if (typeof window !== 'undefined' && window.Cookiebot) {
      // Clear consent and force show
      try {
        window.Cookiebot.deleteConsentCookie();
        window.Cookiebot.regulations.gdprApplies = true;
        window.Cookiebot.isOutOfRegion = false;
        window.Cookiebot.isOutsideEU = false;
        window.Cookiebot.hasResponse = false;
        window.Cookiebot.consented = false;
        window.Cookiebot.declined = false;
        window.Cookiebot.show();
        console.log('✅ Force popup executed');
      } catch (e) {
        console.log('❌ Error in force popup:', e);
      }
    } else {
      console.log('❌ Cookiebot not available for force popup');
    }
  };

  return (
    <div className="min-h-screen bg-base text-text p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Cookiebot Test Page
        </h1>
        
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">Cookiebot Status</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> {cookiebotStatus}</p>
              {consentState && (
                <div className="space-y-1 text-sm">
                  <p><strong>Has Response:</strong> {consentState.hasResponse ? 'Yes' : 'No'}</p>
                  <p><strong>Consented:</strong> {consentState.consented ? 'Yes' : 'No'}</p>
                  <p><strong>Declined:</strong> {consentState.declined ? 'Yes' : 'No'}</p>
                  <div className="mt-2">
                    <p><strong>Consent Categories:</strong></p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Necessary: {consentState.necessary ? '✅' : '❌'}</li>
                      <li>Preferences: {consentState.preferences ? '✅' : '❌'}</li>
                      <li>Statistics: {consentState.statistics ? '✅' : '❌'}</li>
                      <li>Marketing: {consentState.marketing ? '✅' : '❌'}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">Test Controls</h2>
            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Button onClick={handleShowBanner} variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Show Banner
                </Button>
                <Button onClick={handleRenewConsent} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Renew Consent
                </Button>
                <Button onClick={handleForcePopup} variant="destructive">
                  🚨 Force Popup
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">Testing Instructions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">What to check:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Open browser developer tools (F12)</li>
                  <li>Check the Console tab for Cookiebot debug messages</li>
                  <li>Look for the consent popup/banner</li>
                  <li>If no popup appears, check if localhost is added to Cookiebot dashboard</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Cookiebot Configuration:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Domain Group ID: d8078c04-3ae5-433f-a612-a1d0824af6be</li>
                  <li>Blocking Mode: auto</li>
                  <li>Debug Mode: enabled</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Troubleshooting Steps:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Open browser Developer Tools (F12)</li>
                  <li>Go to Console tab and look for debug messages</li>
                  <li>Check if localhost is added to Cookiebot dashboard</li>
                  <li>Clear browser cache and cookies</li>
                  <li>Try incognito/private mode</li>
                  <li>Use the "Force Popup" button above</li>
                  <li>Wait 10 seconds for fallback banner to appear</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}