export type LoginResponse = {
  message: string;
};

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  roles: ("owner" | "sitter")[];
  profileImage?: string;
  isAdmin: boolean;
};

export type GetMeResponse = {
  message: string;
  data: AuthUser;
};

export type LogoutResponse = {
  message: string;
};
