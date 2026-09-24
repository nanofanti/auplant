import type {
  LoginResponse,
  GetMeResponse,
  LogoutResponse,
  RegisterData,
  RegisterResponse,
  ForgotPasswordData,
  ForgotPasswordResponse,
  ResetPasswordData,
  ResetPasswordResponse,
} from "../types/Auth";

export async function register(
  registerData: RegisterData,
): Promise<RegisterResponse> {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "Registration failed");
  }

  const data = await response.json();

  return data;
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  return data;
}

export async function getMe(): Promise<GetMeResponse> {
  const response = await fetch("http://localhost:8080/api/auth/me", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("You are not authorized");
  }

  const data = await response.json();

  return data;
}

export async function logout(): Promise<LogoutResponse> {
  const response = await fetch("http://localhost:8080/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  const data = await response.json();

  return data;
}

export async function forgotPassword(
  data: ForgotPasswordData,
): Promise<ForgotPasswordResponse> {
  const response = await fetch(
    "http://localhost:8080/api/auth/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to request password reset");
  }

  return result;
}

export async function resetPassword(
  token: string,
  data: ResetPasswordData,
): Promise<ResetPasswordResponse> {
  const response = await fetch(
    `http://localhost:8080/api/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to reset password");
  }

  return result;
}
