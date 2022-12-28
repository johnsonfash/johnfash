/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useState } from "react";
import { blurImage } from "./image";

function PreloadImage({
  src,
  className,
  alt,
  md,
  sm,
  lg,
}: {
  src: string;
  className?: string;
  alt?: string;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
}) {
  const [image, setImage] = useState("");

  useMemo(() => {
    if (typeof window === "undefined") return;
    const h = window.innerWidth;
    setImage(blurImage(h > 992 ? lg : h > 768 ? md : sm));
    const img = new Image();
    img.onload = () => {
      setImage(img.src);
    };
    img.onerror = () => {};
    img.src = src.startsWith("https") ? src : window?.location?.origin + src;
  }, [src, lg, md, sm]);

  return <img src={image} alt={alt} className={`w-100 ${className}`} />;
}

export default PreloadImage;
