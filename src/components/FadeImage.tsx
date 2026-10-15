"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image que aparece con un fade suave al terminar de cargar (sin
 * aparición brusca). El espacio queda reservado por width/height: sin saltos.
 */
export function FadeImage({ className = "", onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      alt={alt}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={`transition-opacity duration-600 ease-brand motion-reduce:transition-none ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
