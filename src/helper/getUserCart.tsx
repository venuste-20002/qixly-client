"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "@/app/_actions/useProducts";

export function userCart() {
  const {
    data: cartData,
    refetch: refetchCart,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const data: { data: { cart_items: any } } = await getUserCarts();
      return data?.data;
      
    },
  });

  return { cartData, isLoading, refetchCart };
}
