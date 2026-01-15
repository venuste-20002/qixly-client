"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { useGetInstitutions } from "@/hooks/useGetInstitutions";
import Shops, { ShopsSkeleton } from "@/components/Shops";
import GetPagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import ImageShow from "@/components/ImageShow";
import setNewParams from "@/helper/useChangeParams";
import debounce from "@/lib/debounce";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function ShopsPage() {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const pathname: string = usePathname();
  const router: AppRouterInstance = useRouter();
  const page: number = parseInt(searchParams.get("page") || "1");
  const perPage = 30;
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get("search") || "",
  );

  const { data, isLoading } = useGetInstitutions({
    page: page,
    per_page: perPage,
    search: debouncedSearch,
  });

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
   **/
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const newVal: string = e.target.value;
    setSearch(newVal);
    debounceUseSearch(newVal);
  }

  /*
   * @handlePagination
   * @description Handle pagination
   * @param page {number} The page
   * */
  const handlePagination: (
    page: number,
  ) => (e: React.MouseEvent<Element, MouseEvent>) => void =
    (page: number) =>
    (e: React.MouseEvent): void => {
      e.preventDefault();
      setNewParams("page", `${page}`, searchParams, pathname, router);
    };

  return (
    <div className={"space-y-6"}>
      <div className={"relative flex items-center w-full justify-center"}>
        <Button
          variant="header"
          onClick={() => router.back()}
          className={"absolute left-0"}
        >
          <ChevronLeft />
        </Button>
        <h1 className={"text-center text-xl font-medium"}>Shops</h1>
      </div>
      {/*search*/}
      <div>
        <SearchInput
          placeholder={"Find for shops..."}
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="w-full space-y-6">
        <div>
          {isLoading ? (
            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                {/*Shops Skeleton*/}
                {[...Array(2)].map((_: any, i: number) => (
                  <ShopsSkeleton key={i} />
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <Skeleton className="w-6 h-6" />
                <Skeleton className="w-6 h-6" />
              </div>
            </div>
          ) : !data?.data?.length && data?.data.length === 0 ? (
            <>
              <div className="text-center w-full flex justify-center items-center flex-col gap-5">
                <ImageShow
                  src={"/icon.svg"}
                  alt={"logo"}
                  width={100}
                  height={100}
                  className="opacity-70"
                />
                <p className="font-bold text-3xl text-primaryGray">
                  No Shops found
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className={"grid grid-cols-3 gap-2 w-full"}>
                {data?.data &&
                  data?.data.map((shop: any, i: number) => (
                    <Shops
                      key={shop.id || `${i}`}
                      id={shop.id}
                      name={shop.name}
                      image={shop.image_url}
                    />
                  ))}
              </div>
              <GetPagination
                page={page}
                perPage={perPage}
                totalPages={data?.pagination.total_pages}
                handlePageChange={handlePagination}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
