'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

const COOKIE_NAME = 'sovereign_navigator_cookie_consent';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the cookie exists
    const consent = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    
    // Only show the banner if the cookie is not found
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Set a cookie that expires in 1 year
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `${COOKIE_NAME}=true; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax; Secure`;
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Card className="mx-auto flex max-w-lg flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <Cookie className="h-8 w-8 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            We use cookies to enhance your browsing experience and remember your preferences.
          </p>
        </div>
        <Button onClick={handleAccept} className="w-full shrink-0 sm:w-auto">
          Accept
        </Button>
      </Card>
    </div>
  );
}
