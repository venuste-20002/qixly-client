"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/*
 * @setNewParams
 * @description Set new params
 * @param name {string} The name of the param
 * @param value {string} The value of the param
 * */
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
