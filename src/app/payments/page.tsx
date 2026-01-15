"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import ImageShow from "@/components/ImageShow";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getUserTransactions } from "../_actions/useTransactions";
import React, { useEffect, useState } from "react";
import GetPagination from "@/components/Pagination";
import setNewParams from "@/helper/useChangeParams";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { statusColors, statusColorsText } from "@/utils/statusColors";

/*
 * The formatDate function
 * */
function formatDate(date: Date) {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(newDate);
}

/*
 * The Previous payments props
 * */
interface PreviousPaymentProps {
  id: string;
  timestamp: Date;
  number: string;
  quantity: number;
  channel: string;
  price: number;
}

/*
 * The Previous payments  component
 * */
function PreviousPayment({
  id,
  timestamp,
  quantity,
  price,
}: PreviousPaymentProps) {
  const router = useRouter();
  return (
    <Card className={"flex items-center gap-14 px-4 py-1 bg-gradient-to-br from-white to bg-primaryGray/5"}>
      <div>
        <p className={"font-bold text-md capitalize"}>
          On {formatDate(timestamp)}
        </p>
        <p className={"font-bold text-sm capitalize"}>
          {price?.toLocaleString()} rwf
        </p>
        <p className={"text-primaryGray text-sm"}>{quantity} cards</p>
      </div>
      <div>
        <Button
          className="rounded-3xl px-5 font-bold text-sm w-[100px] bg-white border-2 border-primary text-primary hover:bg-primaryGray/5"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/payments/${id}`);
          }}
        >
          View
        </Button>
      </div>
    </Card>
  );
}

/*
 * The Previous payments  skeleton component
 * */
function PreviousPaymentsSkeleton() {
  return (
    <div className={"flex items-center gap-14"}>
      <Skeleton className={"w-[100px] h-[100px] rounded-xl"} />
      <div className={"space-y-2"}>
        <Skeleton className={"w-[100px] h-5 rounded-xl"} />
        <Skeleton className={"w-[100px] h-5 rounded-xl"} />
        <Skeleton className={"w-[100px] h-5 rounded-xl"} />
      </div>
      <div>
        <Skeleton className={"w-[50px] h-[40px] rounded-xl"} />
      </div>
    </div>
  );
}

/*
 * The Recent payments props
 * params id: string
 * params amount: number
 * params timestamp: Date
 * params number: string
 * params status: string
 * params quantity: number
 * */
interface RecentPaymentProps {
  id: string;
  amount: number;
  timestamp: Date;
  number: string;
  status: string;
  quantity: number;
}

/*
 * The Recent payments component
 * */
function RecentPayments({
  id,
  amount,
  timestamp,
  status,
  quantity,
}: RecentPaymentProps) {
  const router = useRouter();

  return (
    <Card
      className={"p-5 font-bold flex flex-col justify-around text-xl space-y-6 bg-gradient-to-br from-white to-slate-400/40 rounded-xl"}>
      {/*The network and status badge*/}
      <div className={"flex justify-between"}>
        {/*the date and quantity*/}
        <div className={"space-y-2"}>
          <p>On {formatDate(timestamp)}</p>
          <p className={"text-primaryGray"}>
            {quantity} {quantity > 1 ? "Cards" : "Card"}
          </p>
        </div>
        <Badge
          className={`${statusColors[status as keyof typeof statusColors]} ${statusColorsText[status as keyof typeof statusColorsText]}`}
          variant={"status"}
        >
          {status}
        </Badge>
      </div>
      {/*The price and view button*/}
      <div className={"flex justify-between items-center"}>
        <p className={"uppercase text-2xl"}>
          <span className={"text-sm"}>rwf</span> {amount.toLocaleString()}
        </p>
        <Button
          className={"rounded-3xl px-5 font-bold text-sm w-[100px]"}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/payments/${id}`);
          }}
        >
          View
        </Button>
      </div>
    </Card>
  );
}

/*
 * The Payment props
 * */
interface PaymentProps {
  id: string;
  phone_number: string;
  transaction_time: Date;
  total_payed_amount: number;
  created_at: Date;
  payment_channel: string;
  cart: {
    total_quantity: number;
  };
}

/*
 * The Recent payments skeleton component
 * */
function RecentPaymentsSkeleton() {
  return (
    <Card
      className={"p-5 font-bold flex flex-col justify-around text-xl space-y-3"}
    >
      <div className={"flex justify-between items-center"}>
        <Skeleton className={"h-[50px] w-[50px] rounded-full"} />
        <Skeleton className={"h-[30px] w-[50px] rounded-full"} />
      </div>
      <div className={"space-y-2"}>
        <Skeleton className={"w-[100px] h-5 rounded-xl"} />
        <Skeleton className={"w-[100px] h-5 rounded-xl"} />
      </div>
      <div className={"flex justify-between items-center"}>
        <Skeleton className={"w-[70px] h-5 rounded-xl"} />
        <Skeleton className={"w-[70px] h-[40px] rounded-xl"} />
      </div>
    </Card>
  );
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router: AppRouterInstance = useRouter();
  const pathname: string = usePathname();
  const page: number = parseInt(searchParams.get("page") || "1");
  const per_page = 10;
  const [user, setUser] = useState<{ id: string }>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")!);
    setUser(userData);
    setIsReady(true);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["payments", page, per_page],
    queryFn: async () => {
      const data = await getUserTransactions({
        user_id: user?.id!,
        page: page,
        per_page: per_page,
      });
      return data?.data;
    },
    enabled: isReady,
  });

  const handlePagination = (currentPage: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setNewParams("page", `${currentPage}`, searchParams, pathname, router);
  };

  return (
    <>
      {/*the top title and back button*/}
      <div className={"relative flex items-center w-full justify-center"}>
        <Button
          variant="header"
          onClick={() => router.back()}
          className={"absolute left-0"}
        >
          <ChevronLeft />
        </Button>
        <h1 className={"text-center text-xl font-medium"}>My Payments</h1>
      </div>
      {/*the payment cards*/}
      {(!data && !isPending) || (data?.data && data?.data.length === 0) ? (
        <div>
          <div className="text-center w-full flex justify-center items-center flex-col gap-5">
            <ImageShow
              src={"/icon.svg"}
              alt={"logo"}
              width={100}
              height={100}
              className="opacity-70"
            />
            <p className="font-bold text-3xl text-primaryGray">
              No Payments found
            </p>
          </div>
        </div>
      ) : (
        <div className={"space-y-3"}>
          <h3 className={`text-xl font-bold ${page > 1 ? "hidden" : "block"}`}>
            Recent Payment
          </h3>
          {/*  Most recent Payments*/}
          {isPending && page === 1 && <RecentPaymentsSkeleton />}
          {page === 1 && data?.data[0] && (
            <RecentPayments
              number={data?.data[0].phone_number}
              status={data.data[0].tx_status}
              id={data?.data[0].id}
              quantity={data?.data[0].cart.total_quantity}
              amount={data.data[0].total_payed_amount}
              timestamp={
                data.data[0].transaction_time || data.data[0].created_at
              }
              key={data.data[0].id}
            />
          )}

          {/*Previous payments*/}
          <div className={"space-y-3"}>
            <h3 className={"text-xl font-bold"}>Previous Payments</h3>
            {isPending ? (
              <PreviousPaymentsSkeleton />
            ) : (
              <>
                {data?.data
                  .slice(page > 1 ? 0 : 1)
                  .map((payment: PaymentProps) => (
                    <PreviousPayment
                      key={payment?.id}
                      quantity={payment.cart.total_quantity}
                      number={payment.phone_number}
                      timestamp={payment.transaction_time || payment.created_at}
                      id={payment.id}
                      channel={payment.payment_channel}
                      price={payment?.total_payed_amount}
                    />
                  ))}
                <GetPagination
                  page={page}
                  perPage={per_page}
                  totalPages={data?.pagination.total_pages}
                  handlePageChange={handlePagination}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
