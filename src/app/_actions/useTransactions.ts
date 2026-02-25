"use server";

import request from "@/utils/axios";

export async function getUserTransactions({
  user_id,
  page,
  per_page,
}: {
  user_id: string;
  page: number;
  per_page: number;
}): Promise<{
  status: string;
  data: any;
}> {
  const params: any = {
    user_ids: [user_id],
    page: page || 1,
    per_page: per_page || 10,
  };

  const transactionUrl = new URLSearchParams(params).toString();
  const data = await request.get(`/transactions?${transactionUrl}`);
  return { status: "success", data: data };
}


export async function getSingleTransaction({ id }: { id: string }): Promise<{
  status: string;
  data: any;
}> {
  const data = await request.get(`/transactions/${id}`);
  return { status: "success", data: data };
}

export async function getSingleSale({ id }: { id: string }): Promise<{
  status: string;
  data: any;
}> {
  const data: { data: any } = await request.get(`/sales/${id}`);
  return { status: "success", data: data?.data };
}

export async function getSalesItemPdf({ id }: { id: string }): Promise<{
  status: string;
  data: any;
}> {
  const response = await fetch(
    `${process.env.BASE_BACKEND_URL}/sales/${id}/pdf`,
  );

  const contentDisposition = response.headers.get("Content-Disposition")!;
  const fileName =
    contentDisposition.split("/").pop()?.split("=").pop() ||
    `dowload-${id}.pdf`;

  return {
    status: "success",
    data: { file: await response.arrayBuffer(), fileName: fileName },
  };
}
