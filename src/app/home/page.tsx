"use client";

import React from "react";
import { getCards, getCategories } from "@/app/_actions/useProducts";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import CategoriesButton, {
  CategoriesButtonSkeleton,
} from "@/components/CategoriesButton";
import Shops, { ShopsSkeleton } from "@/components/Shops";
import Link from "next/link";
import { useGetInstitutions } from "@/hooks/useGetInstitutions";

export default function HomePage() {
  const getShops_ = useGetInstitutions({ page: 1, per_page: 10 });

  /*
   * @Query get categories
   * @description Fetch categories
   * @return onSuccess {data: {status: string; data: any}}
   * */
  const getCategory = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = await getCategories();
      return data.data;
    },
  });

  /*
   * @Query get products
   * @description Fetch products
   * @return onSuccess {data: {status: string; data: any}}
   * */
  const getProducts_ = useQuery({
    queryKey: ["Cards"],
    queryFn: async () => {
      const data = await getCards({ per_page: 4 });
      return data?.data?.data;
    },
  });

  /*
   * @calculateStartPrice
   * @description Calculate the start price of the product
   * @param variants {Array} The variants of the product
   * @return {number}
   * */
  function calculateStartPrice<T>(variants: T[]): ReturnType<() => number> {
    return Math.min(
      ...variants.map((variant: any) => {
        return variant.price;
      }),
    );
  }

  return (
    <>
      <h1 className={"font-bold text-[30px] leading-[30px] text-primaryBlack"}>
        What would you like to Buy?
      </h1>
      {/*Categories*/}
      <div
        className={
          "flex space-x-5 overflow-x-auto w-full pb-4 px-1 scrollbar-hide bg-gradient-to-br from-white via-white to-primaryGray/10 border-none"
        }
      >
        {getCategory.data?.length === 0 ||
        getCategory.isPending ||
        !getCategory.data ? (
          <>
            {/*Categories Skeleton*/}
            {[...Array(5)].map((_: unknown, i: number) => (
              <CategoriesButtonSkeleton key={i} />
            ))}
          </>
        ) : (
          getCategory &&
          getCategory.data.map(
            (ctx: { id: string; name: string; description: string }) => (
              <CategoriesButton
                name={`${ctx?.name}`}
                id={ctx?.id}
                key={ctx.id}
              />
            ),
          )
        )}
      </div>
      {/*Deals*/}
      <div className="w-full bg-gradient-to-br from-white via-white to-primaryGray/10 py-2 border-none">
        {/*Deals Header */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Deals</h1>
          <Link
            href={"/cards"}
            className={
              "text-primary/70 font-bold cursor-pointer hover:text-primary"
            }
          >
            View all {">"}
          </Link>
        </div>
        {/*Deals content*/}
        <div className={"grid grid-cols-2 w-full p-1 gap-4 mt-3"}>
          {!getProducts_.data ||
          getProducts_.data?.length === 0 ||
          getProducts_.isPending ? (
            <>
              {/*Product Skeleton*/}
              {[...Array(2)].map((_: any, i: number) => (
                <ProductCardSkeleton key={i} />
              ))}
            </>
          ) : (
            getProducts_ &&
            getProducts_.data.map((card: any, i: number) => (
              <ProductCard
                key={card.id || `${i}`}
                id={card?.card?.id}
                name={card?.card?.name}
                expiryDate={card?.card?.expiration_date}
                institutionName={card?.institution?.name}
                startPrice={calculateStartPrice(card?.variants)}
                image={card?.card?.image_url[0]}
              />
            ))
          )}
        </div>
      </div>
      {/*Popular shops*/}
      <div className={"w-full p-1 border-none"}>
        {/*Popular shops title*/}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Popular Shops</h1>
          <Link
            href={"/shops"}
            className={
              "text-primary/70 font-bold cursor-pointer hover:text-primary"
            }
          >
            View all {">"}
          </Link>
        </div>
        {/*popular shops*/}
        <div className={"mt-2 overflow-x-auto flex gap-5 p-2 scrollbar-hide"}>
          {!getShops_.data ||
          getShops_?.data?.data?.length === 0 ||
          getShops_.isLoading ? (
            <>
              {/*Shops Skeleton*/}
              {[...Array(2)].map((_: any, i: number) => (
                <ShopsSkeleton key={i} />
              ))}
            </>
          ) : (
            getShops_?.data?.data &&
            getShops_?.data?.data.map((shop: any, i: number) => (
              <Shops
                key={shop.id || `${i}`}
                id={shop.id}
                name={shop.name}
                image={shop.image_url}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
