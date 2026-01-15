"use client";

import { ProductCardOne } from "@/components/ProductCard";
import { ProductCardOneSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "@/app/_actions/useProducts";
import React, { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import debounce from "@/lib/debounce";
import SearchInput from "@/components/SearchInput";
import GetPagination from "@/components/Pagination";
import ImageShow from "@/components/ImageShow";
import setNewParams from "@/helper/useChangeParams";

export default function Cards() {
  const searchParams = useSearchParams();
  const [perPage] = useState(15);
  const page = parseInt(searchParams.get("page") || "1");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get("search") || "",
  );
  const router = useRouter();
  const pathname = usePathname();

  /*
   * @currentCategories
   * @description Get current categories
   * */
  const currentCategories = searchParams.get("categories")
    ? [searchParams.get("categories")!]
    : [];
  /*
   * @currentShops
   * @description Get current shops
   * */
  const currentShops = searchParams.get("shops")
    ? [searchParams.get("shops")!]
    : [];

  /*
   * @useQuery
   * @description Fetch cards
   * @return {data: {status: string; data: any}}
   * */
  const { data, isPending } = useQuery({
    queryKey: [
      "cards",
      page,
      perPage,
      currentCategories,
      currentShops,
      debouncedSearch,
    ],
    queryFn: async () =>
      getCards({
        per_page: perPage,
        page: page,
        categories: currentCategories,
        shops: currentShops,
        search: debouncedSearch,
      }),
  });

  const cards = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  /*
   * @debounceUseSearch
   * @description Debounce search
   * */
  const debounceUseSearch = useCallback(
    debounce((search: string) => {
      setDebouncedSearch(search);
      setNewParams("search", search, searchParams, pathname, router);
    }),
    [setDebouncedSearch, searchParams, pathname, router],
  );

  /*
   * @handleSearch
   * @description Handle search
   * @param e {React.ChangeEvent<HTMLInputElement>} The event
   * */
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const newVal: string = e.target.value;
    setSearch(newVal);
    debounceUseSearch(newVal);
  }

  /*
   * @handlePageChange
   * @description Handle page change
   * @param currentPage {number} The current page
   * @return {void}
   * */
  const handlePageChange = (currentPage: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setNewParams("page", `${currentPage}`, searchParams, pathname, router);
  };

  return (
    <>
      {/* Search and Filter Buttons */}
      <div className="flex items-center gap-5 mb-5">
        <SearchInput
          placeholder="Find for food or restaurant ..."
          value={search}
          onChange={handleSearch}
        />
        {/*<Button variant="header" className="h-full">*/}
        {/*  <SlidersHorizontal className="text-primary text-2xl" />*/}
        {/*</Button>*/}
      </div>

      {/* Cards */}
      <div className="space-y-4 w-full">
        <>
          {isPending && (
            <>
              {/* Product Skeleton */}
              {[...Array(2)].map((_, i) => (
                <ProductCardOneSkeleton key={i} />
              ))}
              <div className="flex justify-center gap-4">
                <Skeleton className="w-6 h-6" />
                <Skeleton className="w-6 h-6" />
              </div>
            </>
          )}

          {!isPending && cards?.length > 0 && (
            <>
              {cards.map((card: any, i: number) => (
                <ProductCardOne
                  key={card.card.id || i}
                  id={card.card.id}
                  name={card.card?.name}
                  expiryDate={card.card?.expiration_date}
                  institutionName={card.institution?.name}
                  image={card.card?.image_url?.[0]}
                />
              ))}
              <GetPagination
                totalPages={pagination?.total_pages!}
                handlePageChange={handlePageChange}
                page={page}
                perPage={perPage}
              />
            </>
          )}
          {!isPending && !cards?.length && (
            <div className="text-center w-full flex justify-center items-center flex-col gap-5">
              <ImageShow
                src={"/icon.svg"}
                alt={"logo"}
                width={100}
                height={100}
                className="opacity-70"
              />
              <p className="font-bold text-3xl text-primaryGray">
                No cards found
              </p>
            </div>
          )}
        </>
      </div>
    </>
  );
}
