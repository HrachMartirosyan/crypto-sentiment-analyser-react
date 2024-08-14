import { instance } from "./axios.tsx";
import { AxiosResponse } from "axios";
import { CompanyDto } from "../dto/company.dto.ts";

const BASE: string = "/company";

export async function getCompanyList_api(): Promise<
  AxiosResponse<CompanyDto[]>
> {
  return await instance.get(`${BASE}/list`);
}
