import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen w-full h-full">
      <header className="w-full flex bg-zinc-600 ">
        <Link href="/admin/dashboard">Exportar</Link>
      </header>
    </div>
  );
}
