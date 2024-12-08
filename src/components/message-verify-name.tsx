"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import Link from "next/link";

interface LoadingVerifyingNameProps {
  isVerifyingName: boolean;
}

export function MessageVerifyingName({
  isVerifyingName,
}: LoadingVerifyingNameProps) {
  return (
    <Dialog open={isVerifyingName}>
      <div className="w-full h-full px-4 font-merriweather">
        <DialogContent className="bg-zinc-100 rounded-md p-2 font-merriweather ">
          <DialogHeader>
            <DialogTitle className="text-xl w-full text-center flex flex-col justify-center items-center py-2">
              Fique tranquilo.
            </DialogTitle>
            <DialogDescription className=" w-full text-zinc-800 py-2 flex flex-col gap-4">
              <p className="text-xl text-zinc-800  text-center flex flex-col justify-center items-center ">
                ✅Você já confirmou a sua presença!
              </p>
              <div className="flex flex-col w-full justify-center items-center mt-10">
                <p className="text-xl text-zinc-900 text-center flex flex-col justify-center items-center ">
                  Mas está precisando de ajuda? <br /> Toque no botão abaixo e
                  me envie uma mensagem
                </p>
                <Link
                  href={"https://wa.me/5561985593550"}
                  className="w-full mt-4 bg-background text-center text-lg text-white p-2 rounded-md hover:cursor-pointer "
                >
                  Enviar Mensagem
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </div>
      {/* <DialogTrigger>Open</DialogTrigger> */}
    </Dialog>
  );
}
