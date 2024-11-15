import { Suspense } from "react";
import { FallbackLoading, VideoPlayer } from "./components/video-player";
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-white flex flex-col items-center sm:p-10 max-sm:p-5 bg-hero-background bg-no-repeat bg-auto sm:bg-right-bottom max-sm:bg-bottom ">
      <main className="flex flex-col items-center sm:items-start max-sm:mt-10">
        <h1 className="flex w-full justify-center items-center text-3xl font-cinzel lg:text-8xl max-w-xs:text-4xl max-sm:text-5xl sm:text-5xl max-md:text-6xl md:text-6xl text-primary min-[360px]:text-4xl min-[400px]:text-5xl">
          Natal Morais
        </h1>
        <p className="font-merriweather text-lg sm:text-2xl mt-4 text-primary font-light w-full text-center  ">
          Estamos pensando em construir uma nova memória com você...
        </p>
        <Suspense fallback={<FallbackLoading />}>
          <VideoPlayer />
        </Suspense>
        {/* <div className="flex flex-col w-full max-w-screen-lg items-center justify-center mt-20">
          <p className="font-merriweather italic text-center w-full text-primary text-lg">
            Assista o vídeo
          </p>
          <Video src={videoSample} />
        </div> */}
      </main>
    </div>
  );
}
