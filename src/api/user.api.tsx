import { instance } from "./axios.tsx";
import { AxiosResponse } from "axios";
import { UserDto } from "../dto/user.dto.ts";

const BASE: string = "/user";

export async function getUser_api(): Promise<AxiosResponse<UserDto>> {
  return await instance.get(`${BASE}`);
}
