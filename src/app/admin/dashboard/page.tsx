import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen items-center">
      <header className="flex w-full min-w-full bg-zinc-600 justify-center px-4">
        <Link href="/admin/dashboard">Exportar</Link>
      </header>
    </div>
  );
}
