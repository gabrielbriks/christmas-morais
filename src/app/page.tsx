"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { DialogAccess } from "../components/dialog-access";
import { LoadingDefault } from "../components/loading-default";
import { FallbackLoading, VideoPlayer } from "../components/video-player";
import { VideoPlayerConfirmation } from "../components/video-player-confirmation";

export default function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const navigation = useRouter();
  useEffect(() => {
    navigation.replace("/summary");
  }, []);

  return (
    <div className="w-full h-full min-h-screen flex justify-center items-center   ">
      <div className="w-auto h-auto p-4 rounded-lg bg-zinc-200">
        <LoadingDefault />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-h-full w-full bg-background text-white flex flex-col items-center sm:p-10 max-sm:p-5 bg-hero-background bg-no-repeat bg-auto sm:bg-right-bottom max-sm:bg-bottom">
      <DialogAccess />
      <main className="flex flex-col items-center sm:items-start max-sm:mt-10">
        <h1 className="flex w-full justify-center items-center text-3xl font-cinzel lg:text-8xl max-w-xs:text-4xl max-sm:text-5xl sm:text-5xl max-md:text-6xl md:text-6xl text-primary min-[360px]:text-4xl min-[400px]:text-5xl">
          Natal Morais
        </h1>
        <p className="font-merriweather text-lg sm:text-2xl mt-4 text-primary font-light w-full text-center  ">
          Queremos construir uma nova memória com você...
        </p>
        <Suspense fallback={<FallbackLoading />}>
          {searchParams.v == "2" ? (
            <VideoPlayerConfirmation />
          ) : (
            <VideoPlayer />
          )}
        </Suspense>
      </main>
    </div>
  );
}
