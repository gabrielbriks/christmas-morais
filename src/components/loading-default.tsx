import { Loader2 } from "lucide-react";

interface LoadingDefaultProps {
  text?: string;
}
export function LoadingDefault({ text }: LoadingDefaultProps) {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Loader2 size={26} className="animate-spin" />
      <span className="text-lg font-medium">{text || "Carregando ... "}</span>
    </div>
  );
}
