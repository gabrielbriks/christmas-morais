"use client";
// import { DialogAccess } from "@/src/components/dialog-access";
import ElegantCountdown from "@/src/components/elegant-countdown";
import { LoadingDefault } from "@/src/components/loading-default";
import { Input } from "@/src/components/ui/input";
import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { trpc } from "../utils/trpc";

export default function SummaryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [filter, setFilter] = useState<string>("");
  const [listGuests, setListGuests] = useState<Array<any>>([]);

  // const targetDate = new Date();
  // targetDate.setDate(targetDate.getDate() + 7);

  const targetDate = new Date("2024-12-25T12:45:00-03:00");

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
    <div className="min-h-screen max-h-full w-full bg-background text-white flex flex-col items-center sm:p-10 max-sm:p-5 bg-hero-background bg-no-repeat bg-auto sm:bg-right-top max-sm:bg-top">
      {/* <DialogAccess /> */}
      <main className="flex flex-col items-center sm:items-start max-sm:mt-10">
        <h1 className="flex w-full justify-center items-center text-3xl font-cinzel lg:text-8xl max-w-xs:text-4xl max-sm:text-5xl sm:text-5xl max-md:text-6xl md:text-6xl text-primary min-[360px]:text-4xl min-[400px]:text-5xl">
          Natal Morais
        </h1>
        <p className="font-merriweather text-lg sm:text-2xl mt-4 text-primary font-light w-full text-center  ">
          A contagem regressiva começou!
        </p>

        <div className="w-full mt-2 flex flex-col">
          {/* <h2 className="w-full text-center text-4xl font-cinzel text-primary">
            Contagem Regressiva
          </h2> */}
          <ElegantCountdown targetDate={targetDate} />
        </div>

        <div className="mt-10 flex flex-col w-full">
          <p className="font-merriweather text-lg sm:text-2xl ms:mt-4 text-primary font-light w-full text-center  max-sm:font-semibold  ">
            Confirme se o seu nome está na lista e prepare-se para celebrar.
          </p>
        </div>

        {/* <Suspense fallback={<FallbackLoading />}> */}
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
              <p className="text-center text-primary text-lg">
                Opps!
                {errorGuests.message}
              </p>
            ) : (
              filteredGuests?.map((guest) => (
                <div
                  key={guest.id}
                  className="w-full border p-1 px-2 rounded-md"
                >
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
      </main>
    </div>
  );
}
