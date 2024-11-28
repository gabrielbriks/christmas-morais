"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const formSchema = z.object({
  pin: z.string().min(4, {
    message: "O PIN deve conter 4 dígitos.",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function DialogAccess() {
  const [open, isOpen] = useState(true);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = ({ pin }: FormSchemaType) => {
    if (pin === "0225") {
      isOpen(false);
    } else {
      toast.error("O PIN está inválido!", {
        description: "Confira se preencheu o PIN corretamente.",
      });
      form.reset();
    }
  };

  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="rounded-lg">
        <DialogHeader className="justify-center items-center">
          <DialogTitle className="text-primary text-2xl font-merriweather">
            Insira aqui o PIN de acesso
          </DialogTitle>
          <DialogDescription className="text-primary text-base font-merriweather">
            Se você não sabe qual é, retorne na mensagem que lhe enviamos.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full justify-center items-center"
          >
            <div className="flex flex-col w-full justify-center items-center gap-4">
              <Image src={"/bg-lamp-2.jpg"} width={60} height={75} alt="Luz" />
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem className="flex-col gap-4 w-full justify-center items-center text-white">
                    <div className="flex w-full gap-4 justify-center items-center">
                      <FormLabel className="text-white text-lg justify-center text-center self-center">
                        PIN
                      </FormLabel>
                      <FormControl className="w-full flex-col">
                        <InputOTP
                          pattern={REGEXP_ONLY_DIGITS}
                          size={30}
                          maxLength={4}
                          {...field}
                          className="w-full justify-center"
                        >
                          <InputOTPGroup className="text-white w-full justify-center">
                            <InputOTPSlot className="h-14 w-14" index={0} />
                            <InputOTPSlot className="h-14 w-14" index={1} />
                            <InputOTPSlot className="h-14 w-14" index={2} />
                            <InputOTPSlot className="h-14 w-14" index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="w-full flex justify-center items-center mt-10">
              <Button
                type="submit"
                className="bg-primary text-background text-lg font-merriweather font-semibold"
              >
                Confirmar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
