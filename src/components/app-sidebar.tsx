"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/src/components/ui/sidebar";
import { LogOut } from "lucide-react";
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
          className="text-3xl font-bold w-full text-center"
        >
          Morais
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <h2 className="text-xl font-bold">Menu</h2>
          <hr className="h-[0.8px] text-zinc-600 bg-zinc-600 rounded-full" />
          <ul className="list-none">
            <li className="py-4">
              <Link
                href="/admin/dashboard/confirmations"
                className="text-lg font-medium hover:text-primary"
              >
                Confirmações Efetuadas
              </Link>
            </li>

            <li className="py-4">
              <Link
                href="/admin/dashboard/confirmed-dishes"
                className="text-lg font-medium hover:text-primary"
              >
                Pratos Selecionados
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
