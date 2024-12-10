import type { LoginFormData } from "../admin/_components/login-form";

export async function loginAdminAction({ username, password }: LoginFormData) {
  if (
    username.toLocaleLowerCase() == "greis9010@gmail.com" ||
    username.toLocaleLowerCase() == "luannacosta.009@gmail.com"
  ) {
    if (password == "@dexter") {
      return { authenticate: true };
    }
  }

  return { authenticate: false };
}
