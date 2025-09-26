'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, type PropsWithChildren } from 'react';

const SWIPE_THRESHOLD = 50; // Minimum distance for a swipe to be registered

export function SwipeHandler({ children }: PropsWithChildren) {
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || e.changedTouches.length !== 1) {
      return;
    }

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const dx = touchEnd.x - touchStart.current.x;
    const dy = touchEnd.y - touchStart.current.y;

    // Check if the swipe was mostly horizontal or vertical
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        if (dx > 0) {
          // Swipe Right (forward)
          router.forward();
        } else {
          // Swipe Left (back)
          router.back();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(dy) > SWIPE_THRESHOLD) {
        if (dy > 0) {
          // Swipe Down (reload)
          window.location.reload();
        } else {
          // Swipe Up (home)
          router.push('/');
        }
      }
    }

    touchStart.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-x' }} // Allows horizontal scroll while capturing vertical swipes
    >
      {children}
    </div>
  );
}
