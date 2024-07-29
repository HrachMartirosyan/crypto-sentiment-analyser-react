import { UserDto } from "./user.dto.ts";

export type SignInDto = {
  username: string;
  password: string;
};

export type SignInResponseDto = {
  jwt: string;
  user: UserDto;
};

export type SignUpDto = {
  username: string;
  email: string;
  password: string;
};
