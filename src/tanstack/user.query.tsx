import cookie from "cookie";
import { useMutation, useQuery } from "@tanstack/react-query";

import { delay } from "../utils";
import { signIn_api } from "../api/auth.api.tsx";
import { queryClient, queryKeys } from "./client.tanstack.tsx";
import { SignInDto } from "../dto/auth.dto.ts";
import { getUser_api } from "../api/user.api.tsx";

export const useUserQuery = () => {
  return useQuery({
    queryKey: [queryKeys.GET_USER],
    queryFn: async () => {
      await delay(500);
      const cookies = cookie.parse(document.cookie);
      if (!cookies.userToken) {
        return null;
      }
      return getUser_api();
    },
  });
};

export const useAuthUserMutation = () => {
  return useMutation({
    mutationFn: (body: SignInDto) => signIn_api(body),
    onSuccess: ({ data }) => {
      document.cookie = cookie.serialize("userToken", data.jwt);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_USER],
      });
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
