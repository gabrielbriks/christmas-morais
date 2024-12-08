"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { loginAdminAction } from "../../actions/login-admin";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O username deve ter pelo menos 3 caracteres" }),
  password: z
    .string()
    .min(5, { message: "A senha deve ter pelo menos 5 caracteres" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginFormData>();
  const navigation = useRouter();

  const onSubmitAuth = async (dataForm: LoginFormData) => {
    const result = await loginAdminAction(dataForm);

    if (result.authenticate) {
      document.cookie = "admin-auth=true; path=/; max-age=3600";
      navigation.push("/admin/dashboard");
    } else {
      toast.error("Usuário ou senha invalido.", { duration: 8000 });
    }
  };

  return (
    <Card className="mx-auto max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Painel Admin</CardTitle>
        <CardDescription className="text-lg text-center">
          Insira o username e a senha para entrar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitAuth)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...register("username")}
              type="text"
              placeholder="username"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input
              id="password"
              {...register("password")}
              type="password"
              required
              placeholder="senha"
            />
          </div>
          <Button type="submit" className="w-full bg-background ">
            Login
          </Button>
        </form>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  );
}
