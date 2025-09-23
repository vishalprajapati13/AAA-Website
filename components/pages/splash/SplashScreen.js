"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../../app/globals.scss';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="animation_overlay_div">
      <img src="/splash.gif" alt="Splash GIF" className='img-fluid home-page-splash' />
    </div>
  );
}
