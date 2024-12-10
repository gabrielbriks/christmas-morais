"use client";
import { AppSidebar } from "@/src/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import useMediaQuery from "@/src/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full h-full min-h-screen bg-zinc-200 font-merriweather">
        <header className="w-full h-16 bg-background text-white flex mb-10">
          <SidebarTrigger />
          {isMobile && (
            <Link
              href="/admin/dashboard"
              className="flex flex-1 gap-2 justify-center items-center"
            >
              <Image
                src={"/bg-lamp-2.jpg"}
                alt="Aurora Logo"
                width={40}
                height={32}
                className="rounded-full m-0 p-0 rounded-xl "
              />
              <h1 className=" font-merriweather text-2xl ">Aurora</h1>
            </Link>
          )}
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
