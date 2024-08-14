export type UserDto = {
  _id: string;
  username: string;
  email: string;
};

export type AuthUserDto = {
  jwt: string;
  user: UserDto;
};
