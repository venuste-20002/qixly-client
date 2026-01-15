"use server";

import request from "@/utils/axios";

interface SalesRequest {
  phone_number: string;
  coupon_codes: string[];
}

/*
 * @useSales
 * @description Send sales data to the cart API
 * @param data {SalesRequest} The sales data to send
 * @return {status: string; data: any}
 * */
export async function useSales(data: SalesRequest):
 Promise<{ status: string; data: any }> {
  try {
    const response: { data: any } = await request.post("/sales/cart", data);
    return { status: "success", data: response.data };
  } catch (error) {
    return { status: "error", data: error };
  }
}
