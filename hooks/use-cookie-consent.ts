'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CookieConsentState {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  hasResponse: boolean;
  consented: boolean;
  declined: boolean;
}

export interface UseCookieConsentReturn {
  consent: CookieConsentState;
  showConsentBanner: () => void;
  isLoading: boolean;
}

export function useCookieConsent(): UseCookieConsentReturn {
  const [consent, setConsent] = useState<CookieConsentState>({
    necessary: true, // Always true as it's required
    preferences: false,
    statistics: false,
    marketing: false,
    hasResponse: false,
    consented: false,
    declined: false,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  const updateConsentState = useCallback(() => {
    if (typeof window !== 'undefined' && window.Cookiebot) {
      const cookiebot = window.Cookiebot;
      setConsent({
        necessary: cookiebot.consent.necessary,
        preferences: cookiebot.consent.preferences,
        statistics: cookiebot.consent.statistics,
        marketing: cookiebot.consent.marketing,
        hasResponse: cookiebot.hasResponse,
        consented: cookiebot.consented,
        declined: cookiebot.declined,
      });
      setIsLoading(false);
    }
  }, []);

  const showConsentBanner = useCallback(() => {
    if (typeof window !== 'undefined' && window.Cookiebot) {
      window.Cookiebot.renew();
    }
  }, []);

  useEffect(() => {
    // Initial state update
    updateConsentState();

    // Listen for Cookiebot events
    const handleConsentReady = () => {
      console.log('Cookiebot consent ready');
      updateConsentState();
    };

    const handleAccept = () => {
      console.log('User accepted cookies');
      updateConsentState();
    };

    const handleDecline = () => {
      console.log('User declined cookies');
      updateConsentState();
    };

    const handleLoad = () => {
      console.log('Cookiebot loaded');
      updateConsentState();
    };

    // Add event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('CookiebotOnConsentReady', handleConsentReady);
      window.addEventListener('CookiebotOnAccept', handleAccept);
      window.addEventListener('CookiebotOnDecline', handleDecline);
      window.addEventListener('CookiebotOnLoad', handleLoad);

      // Cleanup
      return () => {
        window.removeEventListener('CookiebotOnConsentReady', handleConsentReady);
        window.removeEventListener('CookiebotOnAccept', handleAccept);
        window.removeEventListener('CookiebotOnDecline', handleDecline);
        window.removeEventListener('CookiebotOnLoad', handleLoad);
      };
    }
  }, [updateConsentState]);

  return {
    consent,
    showConsentBanner,
    isLoading,
  };
}


