import request from "@/utils/axios";

interface GetUserSalesItemsProps {
  user_id?: string;
  page: number;
  per_page: number;
}

export async function useGetUserSalesItems({
  user_id,
  page = 1,
  per_page = 10,
}: GetUserSalesItemsProps) {
  const params: any = {
    user_id,
    page,
    per_page,
  };
  const data: { data: any } = await request.get(
    `/sales?${new URLSearchParams(params).toString()}`,
  );
  return data?.data;
}
