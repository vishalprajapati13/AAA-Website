// components/pages/splash/SplashWrapper.jsx
"use client";

import { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';

export default function SplashWrapper({ children }) {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined" && window.name.includes('__splash_shown__')) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        if (typeof window !== "undefined") {
          window.name = (window.name || '') + '__splash_shown__';
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <div>
      {showSplash ? <SplashScreen /> : children}
    </div>
  );
}
