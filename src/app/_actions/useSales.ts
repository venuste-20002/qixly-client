"use server";

import request from "@/utils/axios";

interface SalesRequest {
  phone_number: string;
  coupon_codes: string[];
}

export async function useSales(data: SalesRequest):
 Promise<{ status: string; data: any }> {
  try {
    const response: { data: any } = await request.post("/sales/cart", data);
    return { status: "success", data: response.data };
  } catch (error) {
    return { status: "error", data: error };
  }
}
