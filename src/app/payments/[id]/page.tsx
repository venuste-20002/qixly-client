"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, Download } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getSingleTransaction } from "@/app/_actions/useTransactions";
import ImageShow from "@/components/ImageShow";
import { Badge } from "@/components/ui/badge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { GetImage } from "@/utils/getImages";
import PaymentSinglePageSkeleton from "@/components/skeletons/PaymentSinglePageSkeleton";
import { statusColors, statusColorsText } from "@/utils/statusColors";

/*
 * @SalesItemProps
 * @image: string
 * @name: string
 * @category: string
 * @price: string
 * */
interface SalesItemProps {
  image: string;
  name: string;
  category: string;
  price: number;
  status: string;
  id: string;
}

/*
 * @SalesItems
 * @image: string
 * @name: string
 * @id:string
 * @category: string
 * @price: string
 * */
function SalesItems({
  image,
  name,
  category,
  price,
  status,
  id,
}: SalesItemProps) {
  const getImage: string = GetImage(image);
  const router: AppRouterInstance = useRouter();
  return (
    <div className={"flex items-center justify-between"}>
      <div className="relative w-[100px] h-[100px] rounded-2xl border">
        <ImageShow src={getImage || "/icon.svg"} alt={"Card Image"} fill />
      </div>
      <div>
        <p className={"font-bold text-xl capitalize"}>{name}</p>
        <p className={"text-primaryGray capitalize"}>{category}</p>
        <p className={"text-primary uppercase font-bold text-lg"}>
          {price.toLocaleString()} rwf
        </p>
      </div>
      {status && status === "success" && (
        <Button
          className={"rounded-3xl px-5 font-bold text-sm w-[100px]"}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/orders/${id}`);
          }}
        >
          View
        </Button>
      )}
    </div>
  );
}

export default function SinglePayment() {
  const params: { id: string } = useParams<{ id: string }>();
  const router: AppRouterInstance = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ["singlePayment", params.id],
    queryFn: async () => {
      const data = await getSingleTransaction({ id: params.id });
      return data?.data;
    },
  });
  return (
    <>
      {/*header*/}
      <div className={"relative flex items-center w-full justify-center"}>
        <Button
          variant="header"
          onClick={() => router.back()}
          className={"absolute left-0"}
        >
          <ChevronLeft />
        </Button>
        <h1 className={"text-center text-xl font-medium"}>Orders</h1>
      </div>

      {isPending ? (
        <PaymentSinglePageSkeleton />
      ) : (
        <>
          {/*Sales Item*/}
          {data?.tx_status === "success" &&
            data?.sales_items.map(
              (item: {
                item: {
                  id: string;
                };
                card_variant: {
                  price: number;
                  card: {
                    image_url: string;
                    name: string;
                    category: {
                      name: string;
                    };
                  };
                };
              }) => (
                <SalesItems
                  image={item?.card_variant.card.image_url}
                  name={item?.card_variant.card.name}
                  category={
                    item?.card_variant?.card?.category?.name || "Category"
                  }
                  price={item?.card_variant.price}
                  key={item?.item.id}
                  status={data?.tx_status}
                  id={item?.item?.id}
                />
              ),
            )}

          {/*The transaction details*/}
          <div className={"space-y-3"}>
            <h2>Transaction Details</h2>
            <div className={"flex justify-between items-center px-3"}>
              <div className={"space-y-3 font-bold"}>
                <p>User</p>
                <p>Transaction Number</p>
                <p>Date</p>
                <p>Time</p>
                <p>Amount</p>
                <p>Status</p>
              </div>
              <div className={"space-y-3 text-right"}>
                <p>{data?.user?.name}</p>
                <p>{data?.transaction_number || "-"}</p>
                <p>
                  {new Date(data?.transaction_time || data?.created_at).toLocaleDateString(
                    "en-GB",
                  ) || "-"}
                </p>
                <p>{new Date(data?.transaction_time|| data?.created_at).toLocaleTimeString()}</p>
                <p className={"uppercase"}>
                  {data?.total_payed_amount.toLocaleString()} frw
                </p>
                <div className={"flex items-center justify-end"}>
                  <Badge
                    variant={"status"}
                    className={`${statusColors[data?.tx_status as keyof typeof statusColors]} ${statusColorsText[data?.tx_status as keyof typeof statusColorsText]}`}
                  >
                    {data?.tx_status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className={"w-full h-2 bg-primaryGray/20"}></div>
            <div className={"flex justify-between items-center px-3"}>
              <div className={"font-bold"}>
                <p>Phone Number</p>
                <p>Network transaction Id</p>
                <p>Network</p>
              </div>
              <div className={"text-right"}>
                <p>{data?.phone_number || "-"}</p>
                <p>{data?.channel_transaction_id || "-"}</p>
                <p className="uppercase">{data?.network || "-"}</p>
              </div>
            </div>
          </div>

          {/*The download Button*/}
          <Button className={"w-full font-bold h-12 rounded-xl text-xl"}>
            {" "}
            <Download className={""} /> Print Receipt
          </Button>
        </>
      )}
    </>
  );
}
