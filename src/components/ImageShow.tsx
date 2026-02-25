"use client";

import Image, { ImageProps } from "next/image";

interface ImageShowProps extends ImageProps {
  className?: string;
}

export default function ImageShow({ className, ...props }: ImageShowProps) {
  return (
    <>
      <Image
        {...props}
        className={`${className} object-fill`}
        onError={(e) => (e.currentTarget.src = "/icon.svg")}
        priority
      />
    </>
  );
}
