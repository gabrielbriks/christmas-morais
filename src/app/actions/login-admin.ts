import type { LoginFormData } from "../admin/_components/login-form";

export async function loginAdminAction({ username, password }: LoginFormData) {
  if (username == "greis9010@gmail.com" && password == "@dexter") {
    return { authenticate: true };
  }

  return { authenticate: false };
}
