// TypeScript declarations for Cookiebot CMP
declare global {
  interface Window {
    Cookiebot: {
      // Core properties
      consent: {
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
      };
      hasResponse: boolean;
      consented: boolean;
      declined: boolean;
      regulations: {
        gdprApplies: boolean;
        ccpaApplies: boolean;
        lgpdApplies: boolean;
      };
      isOutOfRegion: boolean;
      isOutsideEU: boolean;
      
      // Methods
      show(): void;
      hide(): void;
      renew(): void;
      deleteConsentCookie(): void;
      submitCustomConsent(
        necessary: boolean,
        preferences: boolean,
        statistics: boolean,
        marketing: boolean
      ): void;
      
      // Event listeners
      addEventListener(event: string, callback: () => void): void;
      removeEventListener(event: string, callback: () => void): void;
    };
    
    // Cookiebot events
    CookiebotOnLoad: CustomEvent;
    CookiebotOnConsentReady: CustomEvent;
    CookiebotOnAccept: CustomEvent;
    CookiebotOnDecline: CustomEvent;
    CookiebotOnDialogInit: CustomEvent;
    CookiebotOnDialogDisplay: CustomEvent;
    CookiebotOnTagsExecuted: CustomEvent;
  }
}

export {};


