import { instance } from "./axios.tsx";
import { SignInDto, SignUpDto } from "../dto/auth.dto.ts";
import { AuthUserDto } from "../dto/user.dto.ts";
import { AxiosResponse } from "axios";

const BASE: string = "/auth";

export async function signIn_api(
  body: SignInDto,
): Promise<AxiosResponse<AuthUserDto>> {
  return await instance.post(`${BASE}/sign-in`, body);
}

export async function signUp_api(
  body: SignUpDto,
): Promise<AxiosResponse<AuthUserDto>> {
  return await instance.post(`${BASE}/sign-up`, body);
}
