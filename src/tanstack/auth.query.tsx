import { useMutation } from "@tanstack/react-query";
import { SignInDto, SignUpDto } from "../dto/auth.dto.ts";
import { signIn_api, signUp_api } from "../api/auth.api.tsx";
import cookie from "cookie";
import { queryClient, queryKeys } from "./client.tanstack.tsx";

export const useSignInMutation = () => {
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

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (body: SignUpDto) => signUp_api(body),
    onSuccess: ({ data }) => {
      document.cookie = cookie.serialize("userToken", data.jwt);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_USER],
      });
    },
  });
};
