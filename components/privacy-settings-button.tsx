'use client';

import { Button } from '@/components/ui/button';
import { Settings, Shield } from 'lucide-react';

interface PrivacySettingsButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export function PrivacySettingsButton({
  variant = 'outline',
  size = 'default',
  className = '',
  children,
}: PrivacySettingsButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.Cookiebot) {
      window.Cookiebot.renew();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      {children || (
        <>
          <Shield className="w-4 h-4 mr-2" />
          Privacy Settings
        </>
      )}
    </Button>
  );
}


