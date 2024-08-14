import cookie from "cookie";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient, queryKeys } from "./client.tanstack.tsx";
import { getUser_api } from "../api/user.api.tsx";
import { hasUserToken } from "../utils/cookie.util.tsx";

export const useUserQuery = () => {
  return useQuery({
    queryKey: [queryKeys.GET_USER],
    queryFn: async () => {
      if (!hasUserToken()) {
        return null;
      }
      return getUser_api();
    },
  });
};

export const useUserLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {},
    onSuccess: () => {
      document.cookie = cookie.serialize("userToken", "some.token", {
        expires: new Date(Date.now() - 1000),
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_USER],
      });
    },
  });
};
