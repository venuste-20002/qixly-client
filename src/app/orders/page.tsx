"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetUserSalesItems } from "../_actions/useGetSalesItems";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ImageShow from "@/components/ImageShow";
import { GetImage } from "@/utils/getImages";
import GetPagination from "@/components/Pagination";
import setNewParams from "@/helper/useChangeParams";
import {
  statusColorsSalesItems,
  statusColorsSalesItemsText,
} from "@/utils/statusColors";
import SalesItemSkeleton from "@/components/skeletons/SalesItemSkeleton";
import { Badge } from "@/components/ui/badge";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

/*
 * SalesItem
 * @description this is a single sales item card
 * @param name string
 * @param price number
 * @param institution string
 * @param status string
 * @return JSX.Element
 * */
interface SalesItemProps {
  id?: string;
  name: string;
  price: number;
  status: string;
  image: string;
}

/*
 * SalesItem
 * @description this is a single sales item card
 * @param name string
 * @param price number
 * @param institution string
 * @param status string
 * @return JSX.Element
 * */
function SalesItem({ id, name, price, status, image }: SalesItemProps) {
  const router:AppRouterInstance = useRouter();
  const generateImage: string = GetImage(image);

  useEffect(() => {
    return () => {
      if (generateImage) {
        URL.revokeObjectURL(generateImage);
      }
    };
  }, []);

  return (
    <Card className="px-2 border rounded-2xl py-2 flex justify-around items-center">
      <div className="flex overflow-hidden relative items-center justify-between h-20 w-20 rounded-2xl border-2">
        <ImageShow
          src={generateImage || "/icon.svg"}
          alt={"Card Image"}
          className={"rounded-2xl"}
          fill
        />
      </div>
      <div className="space-y-1 flex flex-col h-full justify-between gap-2">
        <div>
          <p className="capitalize text-lg">{name}</p>
          <p className="uppercase font-bold">{price.toLocaleString()} rwf</p>
        </div>

        <Badge
          className={`${statusColorsSalesItems[status as keyof typeof statusColorsSalesItems]} ${statusColorsSalesItemsText[status as keyof typeof statusColorsSalesItemsText]}`}
          variant={"statusOrders"}
        >
          {status}
        </Badge>
      </div>
      <Button
        className="p-5 rounded-3xl font-bold cursor-pointer"
        onClick={() => router.push(`/orders/${id}`)}
      >
        View
      </Button>
    </Card>
  );
}

export default function OrdersPage() {
  const [user, setUser] = useState<{ id: string }>();
  const searchParams = useSearchParams();
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");
  const pathname = usePathname();

  const { data, isPending } = useQuery({
    queryKey: ["sales_items", user?.id, page],
    queryFn: async () => {
      return await useGetUserSalesItems({
        user_id: user?.id,
        page: page,
        per_page: 10,
      });
    },
    enabled: isReady,
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUser(userData);
    setIsReady(true);
  }, []);

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
      <div className={"relative flex items-center w-full justify-center"}>
        <Button
          variant="header"
          onClick={() => router.back()}
          className={"absolute left-0"}
        >
          <ChevronLeft />
        </Button>
        <h1 className={"text-center text-xl font-medium"}>My Cards</h1>
      </div>

      {isPending && <SalesItemSkeleton />}

      {data?.data.length === 0 && (
        <div className="text-center w-full flex justify-center items-center flex-col gap-5">
          <ImageShow
            src={"/icon.svg"}
            alt={"logo"}
            width={100}
            height={100}
            className="opacity-70"
          />
          <p className="font-bold text-3xl text-primaryGray">No Cards Found</p>
        </div>
      )}
      {data?.data.length > 0 && (
        <>
          {data?.data?.map(
            (item: {
              item: {
                id: string;
                status: "USED" | "UNUSED";
              };
              card_variant: {
                price: number;
                card: {
                  name: string;
                  image_url: string[];
                };
              };
            }) => (
              <SalesItem
                key={item?.item.id}
                id={item?.item.id}
                name={item?.card_variant.card.name}
                price={item?.card_variant.price}
                status={item?.item.status}
                image={item?.card_variant.card.image_url[0]}
              />
            ),
          )}
          <GetPagination
            totalPages={data?.pagination?.total_pages!}
            handlePageChange={handlePageChange}
            page={page}
            perPage={10}
          />
        </>
      )}
    </>
  );
}
