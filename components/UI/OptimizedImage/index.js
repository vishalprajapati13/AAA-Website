import Image from "next/image";
import { useEffect, useState } from "react";

export const OptimizedImage = ({ src, alt, width, height, ...props }) => {
    const [unoptimized, setUnoptimized] = useState(false);
  
    useEffect(() => {
      const img = new window.Image();
      img.onload = () => {
        if (img.naturalWidth > 8192 || img.naturalHeight > 8192) {
            setUnoptimized(true);
        }
      };
      img.src = src;
    }, [src]);
  
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized={unoptimized}
        {...props}
      />
    );
  };
  