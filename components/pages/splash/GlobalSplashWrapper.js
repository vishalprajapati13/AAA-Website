"use client";

import { useEffect, useState } from "react";
import "../../../app/globals.scss";

const categoryToGifMap = {
  architecture: "/gifs/ARCHITECTURE.gif",
  awards: "/gifs/AWARDS.gif",
  interior: "/gifs/INTERIOR.gif",
  landscape: "/gifs/LANDSCAPE.gif",
  masterplan: "/gifs/MASTERPLAN.gif",
  product: "/gifs/PRODUCTS.gif",
  publication: "/gifs/PUBLICATION.gif",
};

export default function GlobalSplashWrapper({ children, category }) {
  const normalizedCategory = category?.toLowerCase();
  const gifSrc = categoryToGifMap[normalizedCategory];

  const splashKey = `__${normalizedCategory}_splash_shown__`;

  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window !== "undefined" && window.name.includes(splashKey)) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        if (typeof window !== "undefined") {
          window.name = (window.name || "") + splashKey;
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (!gifSrc) {
    console.warn(`No splash screen configured for category: ${category}`);
    return children;
  }

  return (
    <div>
      {showSplash ? (
        <div className="animation_overlay_div">
          <img src={gifSrc} alt={`${category} loader`} className="img-fluid" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
