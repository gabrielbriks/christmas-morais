"use client";
// import { DialogAccess } from "@/src/components/dialog-access";
import ElegantCountdown from "@/src/components/elegant-countdown";
import { InfoLocalization } from "@/src/components/info-localization";
import { useState } from "react";

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
          <ElegantCountdown targetDate={targetDate} />
        </div>

        {/* <div className="mt-10 flex flex-col w-full">
          <p className="font-merriweather text-lg sm:text-2xl ms:mt-4 text-primary font-light w-full text-center  max-sm:font-semibold  ">
            Confirme se o seu nome está na lista e prepare-se para celebrar.
          </p>
        </div> */}

        {/* <ListGuestsConfirmations /> */}

        <div className="mt-10 flex flex-col w-full h-auto bg-[#132239]/60 rounded-md  ">
          <p className="font-merriweather text-2xl mt-10 font-semibold text-white w-full text-center   ">
            Informações do Local
          </p>
          <p className="text-white w-full text-center mt-10 py-4 font-medium font-merriweather text-xl">
            Em breve!
          </p>

          <InfoLocalization />
        </div>
      </main>
    </div>
  );
}
