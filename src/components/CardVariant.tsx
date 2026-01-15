import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageShow from "@/components/ImageShow";
import { useMutation } from "@tanstack/react-query";
import {
  addCardToCart,
  removeCartItemfromCart,
  updateCartItem,
} from "@/app/_actions/useProducts";
import { showToast } from "@/helper/toast";
import React, { useCallback, useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import debounce from "@/lib/debounce";
import { userCart } from "@/helper/getUserCart";

/*
 * @CardVariant
 * @description The card variant
 * @price {number} The price of the card
 * @name {string} The name of the card
 * @return {TSX.Element}
 * */
interface CardVariant {
  id: string;
  price: number;
  name: string;
  quantity: number;
  refetch: () => void;
}

export default function CardVariant({
  id,
  price,
  name,
  refetch,
  quantity,
}: CardVariant) {
  const [quantityCartItem, setQuantityCartItem] = useState(0);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const { cartData, isLoading, refetchCart } = userCart();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => addCardToCart({ id }),
    onSuccess: async () => {
      await refetchCart();
      refetch();
      showToast("Card variant successfully added", "success");
      return;
    },
  });

  const updateItemsInCart = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (quantity == 0) {
        return await removeCartItemfromCart({ id });
      }
      return await updateCartItem({ id, quantity });
    },
    onSuccess: async () => {
      await refetchCart();
      return;
    },
  });

  /*
   * @debouncedUpdateCart
   * @description Debounce update cart
   * */
  const debouncedUpdateCart = useCallback(
    debounce(updateItemsInCart.mutate),
    [updateItemsInCart.mutate],
  );

  /*
   * @addToCart
   * @description Add to cart
   * @param id {string} The id of the card
   * @return {void}
   * */
  const addToCart = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    mutate(id);
  };

  useEffect(() => {
    const itemInCart =
      cartData?.cart_items &&
      cartData?.cart_items.find(
        (item: any): boolean => item?.card_variant_id === id,
      );
    setIsInCart(Boolean(itemInCart));
    setItemsInCart(itemInCart);
    if (itemInCart) {
      setQuantityCartItem(itemInCart?.quantity);
    }
  }, [itemsInCart, cartData]);

  /*
   * @reduceItemsInCart
   * @description Reduce items in cart
   * */
  function reduceItemsInCart() {
    setQuantityCartItem((prev) => {
      const newVal = prev - 1;
      debouncedUpdateCart({ id: id, quantity: newVal });
      return newVal;
    });
  }

  /*
   * @addItemsInCart
   * @description Add items in cart
   * */
  function addItemsInCart() {
    setQuantityCartItem((prev) => {
      const newVal = prev + 1;
      debouncedUpdateCart({ id: id, quantity: newVal });
      return prev + 1;
    });
  }

  return (
    <>
      {isLoading ? (
        <Skeleton className={"w-full h-10 rounded-2xl"} />
      ) : (
        <>
          <Card
            className={`relative grid grid-cols-9 items-center border-2 py-2 px-2 hover:bg-primaryGray/5 ${isInCart ? "border-primary" : ""}`}
          >
            <div className={"col-span-3"}>
              <h2 className={"font-bold capitalize text-md"}>{name}</h2>
            </div>
            <div className={"col-span-3"}>
              <h2 className={"font-bold items-start uppercase text-md w-full"}>
                {price.toLocaleString()} rwf
              </h2>
            </div>
            <div className={"col-span-3 items-center justify-center flex"}>
              {!isInCart ? (
                <Button
                  variant={"cart"}
                  loading={isPending}
                  onClick={addToCart(id)}
                >
                  <div
                    className={
                      "rounded-full bg-white relative h-[30px] w-[30px] flex items-center justify-center"
                    }
                  >
                    <ImageShow
                      src={"/lock_17214868.png"}
                      alt={"Add cart image"}
                      width={20}
                      height={25}
                      className={"object-center"}
                    />
                  </div>
                  Add
                </Button>
              ) : (
                <div
                  className={
                    "col-span-3 flex items-center justify-center gap-3"
                  }
                >
                  <Button
                    variant={"cartroundedminus"}
                    onClick={reduceItemsInCart}
                    disabled={quantityCartItem <= 0}
                  >
                    <Minus />
                  </Button>
                  <p className={"font-bold"}>{quantityCartItem}</p>
                  <Button
                    variant={"cartroundedplus"}
                    onClick={(e) => {
                      e.preventDefault();
                      addItemsInCart();
                    }}
                    disabled={quantityCartItem >= quantity}
                  >
                    <Plus />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </>
  );
}
