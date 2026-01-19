"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetImage } from "@/utils/getImages";
import ImageShow from "@/components/ImageShow";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function ShopsSkeleton() {
  return (
    <>
      <Card
        className={`h-[113.78px] w-[120px] flex flex-col gap-y-4 justify-center items-center p-5`}
      >
        <Skeleton className={"h-14 w-full"} />
        <Skeleton className={"w-full h-2"} />
      </Card>
    </>
  );
}

/*
 * ShopsInterface
 * @id: string
 * @name: string
 * @image: string
 * */
interface ShopsInterface {
  id: string;
  name: string;
  image: string;
}

/*
 * Get Color
 * @description function to get various color
 * */
function GetColor() {
  const colors: string[] = [
    "rgba(202,80,3,0.29)",
    "#F8A44C1A",
    "#D3B0E0B2",
    "#53B175B2",
    "#4C7B8B",
    "#EAE2C6",
    "#bb70ed",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function Shops({ id, name, image }: ShopsInterface) {
  const router: AppRouterInstance = useRouter();
  const imageUrl: string = useGetImage(image);
  const cardColor: string = GetColor();

  const handleGotoShop = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    router.push(`/cards?shops=${id}`);
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  return (
    <Card
      className={`min-w-30 h-32 flex flex-col items-center p-4 border-2 cursor-pointer`}
      onClick={handleGotoShop(id)}
      style={{
        borderColor: `${cardColor}FF`,
        background: `${cardColor}33`
      }}
    >
      <div className="h-16 w-16 flex items-center justify-center">
        {imageUrl && (
          <ImageShow
            src={imageUrl}
            alt="Shop Image"
            width={64}
            height={64}
            className="mix-blend-multiply bg-transparent object-contain"
          />
        )}
      </div>
      <div className="mt-auto w-full">
        <p className="text-center truncate text-sm">{name}</p>
      </div>
    </Card>
  );
}
