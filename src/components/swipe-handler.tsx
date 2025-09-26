
'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, type PropsWithChildren, useEffect, useState } from 'react';

const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe to be registered

export function SwipeHandler({ children }: PropsWithChildren) {
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // This check ensures swipe handlers are only active on touch-enabled devices.
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTouchDevice || e.touches.length !== 1) return;
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isTouchDevice || !touchStart.current || e.changedTouches.length !== 1) {
      return;
    }

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const dx = touchEnd.x - touchStart.current.x;
    const dy = touchEnd.y - touchStart.current.y;

    // Only handle horizontal swipes for navigation
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx > 0) {
          // Swipe Right
          router.forward();
        } else {
          // Swipe Left
          router.back();
        }
      }
    }
    // Vertical swipes are now ignored, allowing for native scrolling.

    touchStart.current = null;
  };

  return (
    <div
      onTouchStart={isTouchDevice ? handleTouchStart : undefined}
      onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
      className="h-full"
    >
      {children}
    </div>
  );
}
