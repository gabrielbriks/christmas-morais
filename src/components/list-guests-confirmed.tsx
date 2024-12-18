"use client";
import { LoadingDefault } from "@/src/components/loading-default";
import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { trpc } from "../app/utils/trpc";
import { Input } from "./ui/input";

export function ListGuestsConfirmations() {
  const [filter, setFilter] = useState<string>("");
  const [listGuests, setListGuests] = useState<Array<any>>([]);

  const {
    data: guestsData,
    isLoading: isLoadingGuests,
    isSuccess,
    error: errorGuests,
    isError: isErrorGuests,
  } = trpc.getGuests.useQuery();

  useEffect(() => {
    if (isSuccess && guestsData) {
      setListGuests(guestsData.guests);
    }
  }, [isSuccess, guestsData]);

  if (isErrorGuests) {
    toast.error(errorGuests.message);
  }

  // Filtra os convidados com base no texto digitado
  const filteredGuests = guestsData?.guests.filter((guest: any) =>
    guest.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-zinc-100 text-background mt-20 p-2 rounded-lg font-merriweather flex flex-col justify-center items-center ">
      <Input
        type="text"
        placeholder="Digite seu nome "
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border-background rounded-md flex w-full p-2 mb-4 -mt-10 bg-white tex-center placeholder:text-center"
      />
      <div className="w-full h-full flex flex-col gap-3">
        {isLoadingGuests ? (
          <LoadingDefault />
        ) : isErrorGuests ? (
          <p className="text-center text-background text-lg">
            Opps!
            {errorGuests.message}
          </p>
        ) : (
          filteredGuests?.map((guest) => (
            <div key={guest.id} className="w-full border p-1 px-2 rounded-md">
              <div>
                <span className="text-lg">{guest.name}</span>
              </div>
              <div className="pl-2">
                {guest.companions.length > 0 && (
                  <p className="text-slate-800 w-full text-xs font-semibold p-2 flex gap-2">
                    <UsersRound strokeWidth={2} size={15} />
                    Acompanhantes:
                  </p>
                )}

                <div className="flex flex-col w-full gap-2 font-merriweather">
                  {guest.companions.length > 0 &&
                    guest.companions.map((companion) => (
                      <span className="pl-4 text-base" key={companion}>
                        {companion}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
