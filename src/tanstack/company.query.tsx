import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./client.tanstack.tsx";
import { getCompanyList_api } from "../api/company.api.tsx";
import { hasUserToken } from "../utils/cookie.util.tsx";

export const useCompanyListQuery = () => {
  return useQuery({
    queryKey: [queryKeys.GET_COMPANY_LIST],
    queryFn: async () => {
      if (!hasUserToken()) {
        return null;
      }
      return getCompanyList_api();
    },
  });
};
