"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSingleCard } from "@/app/_actions/useProducts";
import CardVariant from "@/components/CardVariant";
import SingleCardSkeleton from "@/components/skeletons/SingleCardSkeleton";
import SinglePageLayout from "@/components/SinglePageLayout";

export default function SingleCardPage() {
  const params: { id: string } = useParams<{ id: string }>();
  const { data, isPending, refetch } = useQuery({
    queryKey: ["single_card", params.id],
    queryFn: async () => {
      const data = await getSingleCard(params);
      return data?.data;
    },
  });

  return (
    <div className="p-2 ">
      {isPending ? (
        <SingleCardSkeleton />
      ) : (
        <>
          <SinglePageLayout
            start_date={data?.card?.started_date}
            expiry_date={data?.card?.expiration_date}
            institution={data?.institution?.name}
            name={data?.card?.name}
            image={data?.card?.image_url}
            description={data?.card?.description}
            terms_conditions={data?.card?.terms_conditions}
          >
            {/* Card variants */}
            <div className="my-3">
              <h2 className="font-bold capitalize mb-5 text-xl">
                Select an Option
              </h2>
              <div className="space-y-4">
                {data &&
                  data.variants?.map((variant: any) => (
                    <CardVariant
                      id={variant.id}
                      name={variant.description}
                      price={variant?.price}
                      quantity={variant?.quantity}
                      key={variant.id}
                      refetch={refetch}
                    />
                  ))}
              </div>
            </div>
          </SinglePageLayout>
        </>
      )}
    </div>
  );
}
