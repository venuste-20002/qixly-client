"use client";

import { useQuery } from "@tanstack/react-query";
import { getCardsImages } from "@/app/_actions/useProducts";

export function GetImage(image: string): string {
  /*
   * @Mutate get product image
   * @description Fetch product image
   * @param name {string} The name of the product
   * @return onSuccess {data: {status: string; data: any}}
   * */
  const getProductImage = useQuery({
    queryKey: ["image", image],
    queryFn: async () => {
      const data = await getCardsImages(image);
      if (data.status === "success") {
        const imageUrl: string = URL.createObjectURL(data.data);
        return imageUrl;
      }
    },
    staleTime: 0,
  });
  return getProductImage.data as string;
}
