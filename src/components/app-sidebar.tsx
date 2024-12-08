"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/src/components/ui/sidebar";
import * as Separator from "@radix-ui/react-separator";
import { CheckSquare, FolderOutput, LogOut, Soup } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function AppSidebar() {
  const navigation = useRouter();

  const handleLogout = () => {
    document.cookie = "admin-auth=; path=/; max-age=0"; // Remove o cookie
    navigation.replace("/admin");
  };

  return (
    <Sidebar className="bg-background">
      <SidebarHeader>
        <Link
          href="/admin/dashboard"
          className="text-3xl font-bold w-full text-center flex items-end justify-center"
        >
          <Image
            src={"/bg-lamp-2.jpg"}
            alt="Aurora Logo"
            width={80}
            height={50}
            className="rounded-full m-0 p-0"
          />
          <span className="mx-1 flex-1 text-start">Aurora</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <h2 className="text-xl font-bold">Menu</h2>
          <Separator.Root className="my-[15px] bg-white/30 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px" />
          {/* <hr className="h-[0.8px] text-zinc-600 bg-zinc-600 rounded-full" /> */}
          <ul className="list-none">
            <li className="py-4">
              <Link
                href="/admin/dashboard/confirmations"
                className="text-base font-medium hover:text-primary flex gap-1"
              >
                <CheckSquare size={20} />
                Confirmações Efetuadas
              </Link>
            </li>

            <li className="py-4">
              <Link
                href="/admin/dashboard/confirmed-dishes"
                className="text-base font-medium hover:text-primary flex gap-1"
              >
                <Soup size={20} />
                Pratos Selecionados
              </Link>
            </li>

            <li className="py-4">
              <Link
                href="/admin/dashboard/exports"
                className="text-base font-medium hover:text-primary flex gap-1"
              >
                <FolderOutput size={20} />
                Exportação de dados
              </Link>
            </li>
          </ul>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} variant="ghost">
          <LogOut size={10} />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
