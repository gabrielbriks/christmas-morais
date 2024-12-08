import { HeaderPagesAdmin } from "@/src/components/header-pages-admin";

export default function ConfirmedDishes() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col gap-4">
      <HeaderPagesAdmin title="Pratos Confirmados" />
      <div className="w-full h-full flex-col">
        <h2>Lista</h2>
      </div>
    </div>
  );
}
