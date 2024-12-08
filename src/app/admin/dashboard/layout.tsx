import { AppSidebar } from "@/src/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full min-h-screen bg-zinc-200 font-merriweather">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
