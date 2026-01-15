"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getInstitutions,
  GetInstitutionsProps,
} from "@/app/_actions/useProducts";

/*
 * @Query get shops
 * @description Fetch shops
 * @return onSuccess {data: {status: string; data: any}}
 * */
export const useGetInstitutions = ({
  page,
  per_page,
  search,
}: GetInstitutionsProps) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["shops", page, per_page, search],
    queryFn: async () => {
      const data = await getInstitutions({ page, per_page, search });
      return data?.data;
    },
  });
  return { data, isLoading, refetch };
};
