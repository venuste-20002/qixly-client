"use client";

import React, { useEffect, useState } from "react";
import HeaderImage from "@/components/HeaderImageCarousel";
import { Badge } from "@/components/ui/badge";
import { AlarmClock, MapPin } from "lucide-react";

/*
 * calculate time left
 * this calculates the time left to the expiry date
 * @params expiry_date string
 * @return {days:number, hours: number: minutes:number, seconds:number}
 * */
function calculateTimeLeft(expiry_date: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const expiry = new Date(expiry_date).getTime() - Date.now();

  if (expiry <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days: number = Math.floor(expiry / (24 * 60 * 60 * 1000));
  const hours: number = Math.floor(
    (expiry % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
  );
  const minutes: number = Math.floor((expiry % (60 * 60 * 1000)) / (60 * 1000));
  const seconds: number = Math.floor((expiry % (60 * 1000)) / 1000);

  return { days, hours, minutes, seconds };
}

/*
 * ExpireDateTimer
 * @description this show the amount of time left to the expiration of the card
 */
const ExpireDateTimer: React.FC<{ expiry: Date }> = ({
  expiry,
}: {
  expiry: Date;
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!expiry) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiry));
    }, 1000);
    return () => clearInterval(timer);
  }, [expiry]);

  return (
    <>
      <div className={`px-1 text-sm ${timeLeft && timeLeft?.days <= 3 ? "bg-[#fe2e2e]/30" : "bg-primary/30"} flex items-center rounded-xl justify-around h-14 overflow-hidden`}>
        <div className={`px-3 py-1 text-white rounded-2xl font-bold items-center justify-center text-md flex gap-1 ${timeLeft && timeLeft?.days <=3 ? "bg-[#fe2e2e]":"bg-primary"}`}>
          <AlarmClock />
          Ending in
        </div>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-bold">{timeLeft?.days}</p>
          <p className="text-black/70">days</p>
        </div>
        <div className="w-[1px] h-20 bg-primary/30"></div>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-bold">{timeLeft?.hours}</p>
          <p className="text-black/70">hrs</p>
        </div>
        <div className="w-[1px] h-20 bg-primary/30"></div>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-bold">{timeLeft?.minutes}</p>
          <p className="text-black/70">mins</p>
        </div>
        <div className="w-[1px] h-20 bg-primary/30"></div>
        <div className="flex flex-col gap-1 items-center">
          <p className="font-bold">{timeLeft?.seconds}</p>
          <p className="text-black/70">secs</p>
        </div>
      </div>
    </>
  );
};

/*
 * SinglePage layout props
 * @params start_data string
 * @params expiry_date string
 * @params institution string institution name
 * @params name string name of variant
 * @params children
 * @params image string[] image array
 * */
interface SinglePageLayoutProps {
  start_date: string;
  expiry_date: Date;
  institution: string;
  name: string;
  children: React.ReactNode;
  image: string[];
  terms_conditions: string;
  consumed?: boolean;
  description?: string;
}
const SinglePageLayout: React.FC<SinglePageLayoutProps> = ({
  name,
  image,
  children,
  institution,
  expiry_date,
  start_date,
  consumed,
  description,
  terms_conditions,
}) => {
  return (
    <>
      <HeaderImage image={image} />
      <div className="mt-5 space-y-3">
        <div className={"flex justify-between"}>
          <h1 className="font-semibold text-3xl capitalize">{name}</h1>
          <Badge
            className={`bg-white text-primary rounded-3xl border-2 border-primary h-10 ${
              consumed ? "" : "hidden"
            }`}
          >
            Consumed
          </Badge>
        </div>
        <div className="flex justify-between flex-col gap-2">
          <ExpireDateTimer expiry={expiry_date} />

          {/*<p className="text-primary">Expires in {expireTime} days</p>*/}
          <Badge variant={"location"} style={{ width: "fit-content" }}>
            <MapPin className="w-[20px] h-[20px] fill-primaryGray" />{" "}
            {institution}
          </Badge>
        </div>

        {children}

        {/* Overview and description */}
        <div className="space-y-3">
          <h1 className="font-bold text-xl">Overview</h1>
          <p className="text-primaryGray text-wrap break-words">
            {description}
          </p>
        </div>

        {/* Expiry dates */}
        <div className="gap-2 grid grid-cols-1 mt-5 text-black/80">
          <p className="flex items-center gap-3">
            <AlarmClock className="text-primary" /> Valid From:{" "}
            {new Date(start_date).toLocaleDateString("en-Us", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="flex items-center gap-3">
            <AlarmClock className="text-primary" /> Expire From:{" "}
            {new Date(expiry_date).toLocaleDateString("en-Us", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/*Terms and conditions*/}
        <div className={"mt-4 space-y-3"}>
          <h1 className="font-bold text-xl">Terms and Condition</h1>
          <p className="text-primaryGray">
            {terms_conditions
              ? terms_conditions
              : "No terms and conditions available"}
          </p>
        </div>
      </div>
    </>
  );
};

export default SinglePageLayout;
