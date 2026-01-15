"use client";

import React, { useEffect, use } from "react";
import Splash from "@/components/Splash";
import { redirect, useRouter } from "next/navigation";
import { trustedServices } from "@/app/_actions/useAuth";
import { showToast } from "@/helper/toast";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function Trusted({
  searchParams,
}: {
  searchParams: Promise<{ key: string }>;
}) {
  const router = useRouter();

  /*
   * Mutation to authenticate trusted services
   * @param {string} params
   * @return onSuccess Redirect to home page and store token
   * @return onError show toast message
   * @return onError Redirect to home page
   * */
  const { mutate, isPending } = useMutation({
    mutationFn: async (params: string) => {
      return await trustedServices(params!);
    },
    onSuccess: (data) => {
      if (data.status === "error") {
        showToast("Authentication Failed", "error");
        return router.push("/");
      }

      showToast("Login Successful", "success");
      return router.push("/");
    },
  });

  const params: { key: string } = use(searchParams);
  const paramOriginalFormat = params.key.replace(/ /g, "+");
  const key: string = encodeURIComponent(paramOriginalFormat);

  if (!searchParams) {
    showToast("Authentication Failed", "error");
    return redirect("/");
  }

  useEffect((): void => {
    mutate(key);
  }, [mutate, searchParams]);

  return (
    <div className={"relative w-full h-full"}>
      <Splash />
      <div
        className={`absolute w-full h-full bg-primaryGray/70 top-0 items-center justify-center ${isPending ? "flex" : "hidden"}`}
      >
        <Loader2 className={"text-black w-10 h-10 animate-spin"} />
      </div>
    </div>
  );
}
