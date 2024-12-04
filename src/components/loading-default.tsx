import { Loader2 } from "lucide-react";

export function LoadingDefault() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Loader2 size={26} className="animate-spin" />
      <span className="text-lg font-medium">Carregando ... </span>
    </div>
  );
}
