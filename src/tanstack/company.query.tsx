import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./client.tanstack.tsx";
import { getCompanyList_api } from "../api/company.api.tsx";

export const useCompanyListQuery = () => {
  return useQuery({
    queryKey: [queryKeys.GET_COMPANY_LIST],
    queryFn: async () => {
      return getCompanyList_api();
    },
  });
};
