import { HeaderPagesAdmin } from "@/src/components/header-pages-admin";

export default function ExportsPage() {
  return (
    <div className="h-full w-full">
      <HeaderPagesAdmin title="Exportação de dados" />
      <div className="w-full h-full flex flex-col gap-4 px-6">
        <h2>Exportar lista de convidados</h2>
        <h2>Exportar detalhes dos pratos selecionados</h2>
      </div>
    </div>
  );
}
