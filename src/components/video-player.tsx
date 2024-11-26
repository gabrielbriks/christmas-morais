"use client";
import { getCldVideoUrl } from "next-cloudinary";
// import Player from "next-video/player";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const URL_VIDEO =
  "https://res.cloudinary.com/moraisdev/video/upload/v1658243266/samples/cld-sample-video.mp4";
export const FallbackLoading = () => {
  return (
    <div className="flex w-full h-full items-center justify-center text-primary">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export function VideoPlayer() {
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [showPlayer, setShowPlayer] = useState<boolean | null>(null);

  const cldUrlVide = getCldVideoUrl({
    width: 960,
    height: 600,
    src: "samples/cld-sample-video",
  });

  useEffect(() => {
    setShowPlayer(true);
  }, [cldUrlVide]);

  const handleTimeUpdate = (event: any) => {
    const videoElement = event.currentTarget;
    const currentTime = videoElement.currentTime;
    const duration = videoElement.duration;

    // Verifica se o vídeo está em 90% ou mais
    if (currentTime / duration >= 0.9 && !showConfirmButton) {
      setShowConfirmButton(true);
    }
  };

  return (
    <div className="flex flex-col w-full h-full max-h-screen max-w-screen-lg items-center justify-between mt-20">
      <div className="flex flex-col min-w-full max-w-lg h-full gap-4 ">
        <p className="font-merriweather italic text-center w-full text-primary text-lg">
          Assista o vídeo
        </p>
        {showPlayer && (
          <div className="w-full justify-center items-center">
            {/* <Player src={URL_VIDEO} onTimeUpdate={handleTimeUpdate} /> */}
            <ReactPlayer
              controls
              width="100%"
              height="100%"
              poster=""
              config={{
                file: {
                  attributes: {
                    controlsList: ["nodownload"], // Isso oculta o botão de download
                    poster: "/poster-video.png",
                  },
                },
              }}
              onProgress={(e) => {
                if (e.playedSeconds >= 142.239576) {
                  setShowConfirmButton(true);
                }
              }}
              playsInline={true}
              url="https://natal.moraisgabriel.com.br/main-video.mp4"
            />
          </div>
        )}
      </div>

      {showConfirmButton && (
        <div className="flex flex-col h-full justify-end items-center mt-36 flex-1 py-16">
          {/* Exibe o botão somente quando o vídeo estiver em 90% ou mais */}
          <div className="flex-col justify-end ">
            <p className="text-lg font-merriweather font-semibold text-primary">
              Gostaria de estar conosco?
            </p>
            <button
              onClick={() => alert("Obrigado por confirmar seu interesse!")}
              className="mt-4 px-6 py-3 bg-primary text-slate-900 font-semibold font-merriweather rounded-lg hover:bg-primary/40"
            >
              Sim, quero participar!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
