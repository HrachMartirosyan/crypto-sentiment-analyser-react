import { instance } from "./axios.tsx";
import { SignInDto, SignInResponseDto } from "../dto/auth.dto.ts";
import { AxiosResponse } from "axios";

const BASE: string = "/auth";

export async function signIn_api(
  body: SignInDto,
): Promise<AxiosResponse<SignInResponseDto>> {
  return await instance.post(`${BASE}/sign-in`, body);
}
