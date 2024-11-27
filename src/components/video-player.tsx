"use client";
import { getCldVideoUrl } from "next-cloudinary";
// import Player from "next-video/player";
import { useEffect, useState } from "react";
// import ReactPlayer from "react-player";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/layouts/video.css";
import "@vidstack/react/player/styles/default/theme.css";
import Link from "next/link";

const URL_VIDEO_R2 = "https://r2.moraisgabriel.com.br/main_video.mp4";
const VIDEO_YOUTUBE_URL = "https://www.youtube.com/watch?v=Xp_bt4BrvxI";
const SECONDS_VIDEO_ENDED_FOR_SHOW_BUTTON = 142.239576;
const URL_WHATS_GROUP = "https://bit.ly/natal-morais-group";
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

  return (
    <div className="flex flex-col w-full h-full max-w-screen-lg items-center justify-between mt-20">
      <div className="flex flex-col min-w-full max-w-lg h-full gap-4 ">
        <p className="font-merriweather italic text-center w-full text-primary text-lg">
          Assista o vídeo
        </p>
        {showPlayer && (
          <>
            <MediaPlayer
              playsInline
              title="Natal 2024"
              src={VIDEO_YOUTUBE_URL}
              onTimeUpdate={(e) => {
                // Verifica se o vídeo está no minuto final do video
                if (e.currentTime >= SECONDS_VIDEO_ENDED_FOR_SHOW_BUTTON) {
                  setShowConfirmButton(true);
                }
              }}
            >
              <MediaProvider />
              <DefaultVideoLayout
                thumbnails="/poster-video.png"
                icons={defaultLayoutIcons}
              />
            </MediaPlayer>
          </>
        )}
      </div>

      {showConfirmButton && (
        <div className="flex flex-col h-full justify-end items-center max-md:mt-15 md:mt-20 flex-1 py-16">
          {/* Exibe o botão somente quando o vídeo estiver em 90% ou mais */}
          <div className="flex-col justify-end gap-4 ">
            <p className="text-lg font-merriweather font-semibold text-primary mb-5">
              Gostaria de estar conosco?
            </p>
            <Link
              href={URL_WHATS_GROUP}
              className="mt-4 px-6 py-3 bg-primary text-slate-900 font-semibold font-merriweather rounded-lg hover:bg-primary/40"
            >
              Sim, quero participar!
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
