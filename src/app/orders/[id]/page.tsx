"use client";

import { useParams } from "next/navigation";
import { Download, Expand, FileText, Share } from "lucide-react";
import React, { useEffect, useState } from "react";
import ImageShow from "@/components/ImageShow";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSalesItemPdf, getSingleSale } from "@/app/_actions/useTransactions";
import { getQrCodeImage } from "@/app/_actions/useProducts";
import SingleSaleItemSkeleton from "@/components/skeletons/SingleSalesItemSkeleton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import SinglePageLayout from "@/components/SinglePageLayout";
import { date } from "zod";

/*
 * viewqrfull component
 */
function ViewQrFull({ image }: { image: string }) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Expand className={"text-xl"} />
        </DialogTrigger>
        <DialogContent className="min-h-[400px] p-5">
          <DialogHeader>
            <DialogTitle>QR</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center h-full">
            <div className="">
              <ImageShow
                src={image}
                alt="qrcode image"
                width={500}
                height={500}
              />
            </div>
          </div>
        </DialogContent>{" "}
      </Dialog>
    </>
  );
}

/*
 * sales Item status
 **/
const SaleItemStatus = {
  USED: "USED",
  UNUSED: "UNUSED",
};

/*
 * Get Usage Time
 */
function getUsageTime(created_time: string, usage_days: number): Date {
  const dateCreateAt = new Date(created_time);
  return new Date(dateCreateAt.getTime() + usage_days * 24 * 60 * 60 * 1000);
}

export default function SingleOrderPage() {
  const params: { id: string } = useParams<{ id: string }>();
  const [isReadyParams, setIsReadyParams] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["salesItem", params.id],
    queryFn: async () => {
      const data = await getSingleSale({ id: params.id });
      return data?.data;
    },
    enabled: isReadyParams,
  });

  const { data: qrCodeImage, isPending: qrCodeImageLoading } = useQuery({
    queryKey: ["salesItemQrCodeImage", params.id],
    queryFn: async () => {
      const data = await getQrCodeImage({ sales_id: params.id });
      if (data.status === "success") {
        const qrCode: string = URL.createObjectURL(data.data);
        return qrCode;
      }
    },
    staleTime: 0,
    enabled: isReadyParams,
  });

  const useDownloadFilePdf = useMutation({
    mutationFn: async ({ id }: { id: string }) => getSalesItemPdf({ id: id }),
    onSuccess: async (data) => {
      const fileBlob = new Blob([data?.data.file], { type: "application/pdf" });
      const url = window.URL.createObjectURL(fileBlob);

      // create an anchor to download
      const link = document.createElement("a");
      link.href = url;
      link.download = data?.data?.fileName;
      document.body.appendChild(link);

      // start to download
      link.click();

      // Remove the anchor tag
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });

  /*
   * @DownloadPdf
   * @description Function to invoke the pdf download
   * */
  function DownloadPdf() {
    useDownloadFilePdf.mutate({ id: params.id });
  }

  const usageTime = getUsageTime(
    data?.item?.created_at,
    data?.card_variant?.card?.usage_time,
  );
  useEffect(() => {
    if (params.id) {
      setIsReadyParams(true);
    }
  }, [params.id]);

  return (
    <div className={"space-y-6"}>
      {isPending ? (
        <SingleSaleItemSkeleton />
      ) : (
        <>
          <SinglePageLayout
            start_date={data?.card_variant.card?.started_date}
            expiry_date={usageTime}
            institution={data?.card_variant.card?.institution?.name}
            name={data?.card_variant.card.name}
            image={data?.card_variant.card.image_url}
            description={data?.card_variant?.card.description}
            terms_conditions={data?.card_variant?.card.terms_conditions}
          >
            <div className={"space-y-3 px-5"}>
              {/* Current Selected Price */}
              <h2 className={"font-medium uppercase"}>
                <span className={"text-3xl font-bold"}>
                  {data?.card_variant?.price}
                </span>{" "}
                rwf
              </h2>

              <div className={"space-y-3"}>
                {data?.item.status === SaleItemStatus.USED ? (
                  <>
                    <Card className="bg-primaryGray/20 flex justify-center items-center p-5">
                      <div className="flex flex-col justify-center items-center space-y-2 text-primaryGray">
                        <FileText className="w-[70px] h-[70px]" />
                        <p>Card Already used </p>
                        <p>
                          Used on{" "}
                          {new Date(data?.item?.used_date).toLocaleDateString(
                            "en-GB",
                            {
                              month: "short",
                              year: "numeric",
                              day: "numeric",
                            },
                          )}{" "}
                          on{" "}
                          {new Date(data.item?.used_date).toLocaleTimeString()}
                        </p>
                      </div>
                    </Card>
                  </>
                ) : (
                  <>
                    {qrCodeImageLoading ? (
                      <>
                        <Skeleton className={"w-full h-[200px]"} />
                      </>
                    ) : (
                      <>
                        <div
                          className={
                            "w-full relative h-[200px] flex justify-center items-center p-3"
                          }
                        >
                          <div
                            className={
                              "absolute right-14 -top-4 z-50 text-black bg-primaryGray/60 p-1 flex justify-center items-center rounded-md"
                            }
                          >
                            <ViewQrFull image={qrCodeImage!} />
                          </div>
                          <div className={"relative min-w-[50%] h-full"}>
                            <ImageShow
                              src={qrCodeImage!}
                              alt={"the qrcode"}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>

                        {/* The share and download button */}
                        <div
                          className={"w-full flex justify-around items-center"}
                        >
                          <Button
                            className={
                              "bg-white border-2 w-[40%] border-primary text-primary rounded-xl hover:bg-white"
                            }
                          >
                            <Share /> Share
                          </Button>
                          <Button
                            className={"rounded-xl w-[40%]"}
                            onClick={DownloadPdf}
                            loading={useDownloadFilePdf.isPending}
                          >
                            <Download /> Download
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </SinglePageLayout>
        </>
      )}
    </div>
  );
}
