"use client";

import Image, { ImageProps } from "next/image";

interface ImageShowProps extends ImageProps {
  className?: string;
}

/*
 * ImageShow component is a wrapper around the Next.js Image component.
 * It is used to display images in the application.
 * @param {string} className - The class name of the image.
 * @param {ImageProps} props - The props of the image.
 * @returns {ReactElement} - The image element.
 * */
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
