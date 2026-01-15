import request from "@/utils/axios";

/*
 * Get sales items props
 * @param user_id: string
 * @param page: number
 * @param per_page: number
 * */
interface GetUserSalesItemsProps {
  user_id?: string;
  page: number;
  per_page: number;
}

/*
 * Get user sales items
 * @param user_id: string
 * @param page: number
 * @param per_page: number
 * @return Promise
 * */
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
