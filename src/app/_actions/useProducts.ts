"use server";

import request from "@/utils/axios";

export async function getCategories(): Promise<{ status: string; data: any }> {
  try {
    const categories: { data: any } = await request.get(
      "/category?page=1&per_page=10",
    );
    const categoriesOnly: Object[] = [];
    categories.data?.data.forEach((data: any) => {
      if (data.cards.length > 0) {
        categoriesOnly.push(data.category);
      }
    });
    return { status: "success", data: categoriesOnly };
  } catch (error) {
    return { status: "error", data: error };
  }
}

enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPIRED = "EXPIRED",
}

export interface getCardProps {
  page?: number;
  per_page?: number;
  categories?: any[];
  shops?: any[];
  search?: string;
}

export async function getCards({
  page,
  per_page,
  categories,
  shops,
  search,
}: getCardProps): Promise<{ status: string; data: any }> {
  try {
    const params: any = {
      status_: Status.ACTIVE,
      page: page || 1,
      per_page: per_page || 20,
    };
    if (categories?.length) {
      categories.forEach((category) => {
        params[`category`] = category;
      });
    }
    if (shops?.length) {
      shops.forEach((shop) => {
        params[`institution`] = shop;
      });
    }
    if (search) {
      params[`search`] = search;
    }
    const cardUrl = new URLSearchParams(params).toString();
    const cards: { data: any } = await request.get(`/cards?${cardUrl}`);
    return { status: "success", data: cards.data };
  } catch (error) {
    return { status: "error", data: error };
  }
}

export async function getCardsImages(
  id: string,
): Promise<{ status: string; data: any }> {
  const cardImage: Response = await fetch(
    `${process.env.BASE_BACKEND_URL}/resources/${id}`,
    {
      headers: {
        Accept: "image/*",
      },
    },
  );
  return { status: "success", data: await cardImage.blob() };
}

/*
 * getQrCodeImage
 * @param sales_id {string} sales item id
 * @return {status:string;data:any}
 * */
export async function getQrCodeImage({
  sales_id,
}: {
  sales_id: string;
}): Promise<{
  status: string;
  data: any;
}> {
  try {
    const qrImage: Response = await fetch(
      `${process.env.BASE_BACKEND_URL}/sales/${sales_id}/view`,
      {
        headers: {
          Accept: "image/*",
        },
      },
    );
    return { status: "success", data: await qrImage.blob() };
  } catch (error) {
    return { status: "error", data: error };
  }
}

export interface GetInstitutionsProps {
  page?: number;
  per_page?: number;
  search?: string;
}

export async function getInstitutions({
  page,
  per_page,
  search,
}: GetInstitutionsProps): Promise<{ status: string; data: any }> {
  const params: any = {
    page: page || 1,
    per_page: per_page || 20,
  };

  if (search) {
    params[`search`] = search;
  }

  const institutionUrl = new URLSearchParams(params).toString();
  const institutions: { data: any } = await request.get(
    `/institution/free?${institutionUrl}`,
  );
  return { status: "success", data: institutions };
}

interface getCardDetailsProps {
  id: string;
}

export async function getSingleCard({
  id,
}: getCardDetailsProps): Promise<{ status: string; data: any }> {
  const cards: { data: any } = await request.get(`/cards/${id}`);
  return { status: "success", data: cards.data };
}

interface getUserCartProps {
  id?: string;
}

export async function getUserCarts(): Promise<{ status: string; data: any }> {
  const cart: { data: any } = await request.get(`/carts/me`);
  return { status: "success", data: cart?.data };
}

export async function addCardToCart({
  id,
}: getUserCartProps): Promise<{ status: string; data: any }> {
  const cart: { data: any } = await request.post(`/carts/me`, {
    card_variant_id: id,
    quantity: 1,
  });
  return { status: "success", data: cart?.data };
}

export async function removeCartItemfromCart({
  id,
}: getUserCartProps): Promise<{ status: string; data: any }> {
  console.log(id, '----- from the cart item')
  const cart: { data: any } = await request.delete(`/carts/me/${id}`);
  return { status: "success", data: cart?.data };
}

/*
 * @updateCartItemProps
 * @param id {string} The id of the card
 * @param quantity {number} The quantity of the card
 * */
interface updateCartItemProps {
  id: string;
  quantity: number;
}

/*
 * @updateCartItem
 * @param id {string} The id of the card
 * @param quantity {number} The quantity of the card
 * @return {status: string; data: any}
 * */
export async function updateCartItem({
  id,
  quantity,
}: updateCartItemProps): Promise<{ status: string; data: any }> {
  try {
    const cart: { data: any } = await request.patch(`/carts/me/${id}`, {
      quantity: quantity,
    });
    return { status: "success", data: cart?.data };
  } catch (err) {
    console.log(err);
    return { status: "error", data: err };
  }
}

export interface updateCartCouponItem {
  coupon_code: string[];
  cart_items: { card_variant_id: string; quantity: number }[];
}

export async function CartCouponFullResponse({
  coupon_code,
  cart_items,
}: updateCartCouponItem): Promise<{ status: string; data: any }> {
  try {
    const response: { data: any } = await request.patch(`/carts/me/apply/${coupon_code}`, { cart_items });
    return { status: "success", data: response.data };
  } catch (error) {
    return { status: "error", data: error };
  }
}
