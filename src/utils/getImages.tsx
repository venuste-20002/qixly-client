"use client";

import { useQuery } from "@tanstack/react-query";
import { getCardsImages } from "@/app/_actions/useProducts";

export function useGetImage(image: string): string {
  /*
   * @Hook get product image
   * @description Fetch product image
   * @param image {string} The image identifier
   * @return {string} The image URL or undefined if not loaded
   * */
  const { data: imageUrl } = useQuery({
    queryKey: ["image", image],
    queryFn: async () => {
      const data = await getCardsImages(image);
      if (data.status === "success") {
        return URL.createObjectURL(data.data);
      }
      return null;
    },
    staleTime: 0,
  });
  return imageUrl || "/icon.svg";
}
