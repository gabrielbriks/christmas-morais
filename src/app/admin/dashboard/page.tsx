"use client";
import { CardItemDashboard } from "@/src/components/dashboard/card-item-dashboard";
import { HeaderPagesAdmin } from "@/src/components/header-pages-admin";
import { LoadingDefault } from "@/src/components/loading-default";
import { toast } from "sonner";
import { trpc } from "../../_trpc/trpc-client";

export default function DashboardPage() {
  const {
    data: infoDashboard,
    isLoading: isLoadingData,
    isError,
    error,
  } = trpc.getInfoDashboard.useQuery();

  if (isError) {
    toast.error(error.message);
  }

  // if (isLoadingData) {
  //   return <LoadingDefault />;
  // }

  return (
    <div className="flex flex-col w-full h-full min-h-screen items-center ">
      <HeaderPagesAdmin title="Dashboard" />

      <div className="w-full h-full flex flex-col lg:px-6 px-4 mt-10 justify-center items-center mb-10">
        {isLoadingData ? (
          <LoadingDefault />
        ) : (
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 max-sm:grid-cols-1 gap-8 justify-items-center ">
            <CardItemDashboard
              title="Total Confirmados"
              content={infoDashboard?.totalGuest.toString() || "0"}
              description="Convidados com presenças confirmadas"
            />
            <CardItemDashboard
              title="Total Pratos"
              content={infoDashboard?.totalDishesSelected.toString() || "0"}
              description="Total de pratos selecionados"
            />
            <CardItemDashboard
              title="Total Pendentes"
              content={`${
                infoDashboard?.totalGuestPendents.toString() || "0"
              } / ${infoDashboard?.totalGuestConfigured || "0"}`}
              description="Convidados não confirmados, com base no total informado"
            />
          </div>
        )}
      </div>
    </div>
  );
}
