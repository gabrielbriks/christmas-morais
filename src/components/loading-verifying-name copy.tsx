"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface LoadingVerifyingNameProps {
  isVerifyingName: boolean;
}

export function LoadingVerifyingName({
  isVerifyingName,
}: LoadingVerifyingNameProps) {
  return (
    <Dialog open={isVerifyingName}>
      <div className="w-full h-full px-4">
        <DialogContent className="bg-zinc-100 rounded-md p-2">
          <DialogHeader>
            <DialogTitle className="text-xl w-full text-center flex flex-col justify-center items-center py-2">
              <Loader2 size={26} className="animate-spin" />
              <span className="text-xl font-medium">Aguarde ... </span>
            </DialogTitle>
            <DialogDescription>
              <p className="text-center text-lg text-slate-800 mt-4">
                Verificando nome e confirmação...
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </div>
      {/* <DialogTrigger>Open</DialogTrigger> */}
    </Dialog>
  );
}
