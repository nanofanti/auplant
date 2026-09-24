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

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  data: AuthUser;
};

export type ForgotPasswordData = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
  resetToken?: string;
};

export type ResetPasswordData = {
  password: string;
};

export type ResetPasswordResponse = {
  message: string;
};
