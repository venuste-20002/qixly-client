"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function setNewParams(
  name: string,
  value: string,
  searchParams: URLSearchParams,
  pathname: string,
  router: AppRouterInstance,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  const newUrl = `${pathname}?${params.toString()}`;
  router.push(newUrl);
}
