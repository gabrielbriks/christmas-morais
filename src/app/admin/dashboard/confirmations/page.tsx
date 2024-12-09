"use client";
import { trpc } from "@/src/app/utils/trpc";
import { CardGuestInfo } from "@/src/components/dashboard/card-guest-info";
import { HeaderPagesAdmin } from "@/src/components/header-pages-admin";
import { LoadingDefault } from "@/src/components/loading-default";

export default function ListConfirmationsPage() {
  const {
    data: guestsData,
    isLoading: isLoadingGuests,
    error: errorGuests,
    isError: isErrorGuests,
  } = trpc.getGuests.useQuery();

  return (
    <div className="flex flex-col w-full h-full min-h-screen ">
      <HeaderPagesAdmin title="Confirmações de Presenças Efetuadas" />
      <div className="flex flex-col w-full h-full mb-10 mt-20 gap-4 items-center px-4">
        {isLoadingGuests ? (
          <LoadingDefault />
        ) : isErrorGuests ? (
          <p className="text-center text-primary text-lg">
            {errorGuests.message}
          </p>
        ) : (
          guestsData?.guests.map((guest) => (
            <CardGuestInfo
              key={guest.id}
              nameGuest={guest.name}
              listCompanions={guest.companions}
            />
          ))
        )}
      </div>
    </div>
  );
}
