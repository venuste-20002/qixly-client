"use server";

import request from "@/utils/axios";

/*
 * @getUserTransactions
 * @description Fetch user transactions
 * @user_id {string} The user id
 * @page {number} The page number
 * @per_page {number} The number of transactions per page
 * @return {status: string; data: any}
 * */
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

/*
 * @getSingleTransaction
 * @description Fetch single transaction
 * @id {string} The id of the transaction
 * @return {status: string; data: any}
 * */
export async function getSingleTransaction({ id }: { id: string }): Promise<{
  status: string;
  data: any;
}> {
  const data = await request.get(`/transactions/${id}`);
  return { status: "success", data: data };
}

/*
 * @getSingle
 * @description Fetch single sale
 * @id {string} The id of the sale
 * @return {status: string; data: any}
 * */
export async function getSingleSale({ id }: { id: string }): Promise<{
  status: string;
  data: any;
}> {
  const data: { data: any } = await request.get(`/sales/${id}`);
  return { status: "success", data: data?.data };
}

/*
 * @getSinglesalesItempdf
 * @description generate single sale item pdf
 * @id {string} The id of the sale
 * @return {status: string; data: any}
 * */
export async function getSalesItemPdf({ id }: { id: string }): Promise<{
  status: string;
  data: any;
}> {
  const response = await fetch(
    `${process.env.BASE_BACKEND_URL}/sales/${id}/pdf`,
  );

  // get the file composititon and file name
  const contentDisposition = response.headers.get("Content-Disposition")!;
  const fileName =
    contentDisposition.split("/").pop()?.split("=").pop() ||
    `dowload-${id}.pdf`;

  return {
    status: "success",
    data: { file: await response.arrayBuffer(), fileName: fileName },
  };
}
