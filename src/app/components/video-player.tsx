"use client";
import videoSample from "@/../videos/video-sample.mp4";
import Video from "next-video";
import { useState } from "react";
export function VideoPlayer() {
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const handleTimeUpdate = (event: any) => {
    console.log("handleTimeUpdate", event);
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
      <div className="flex-col w-full">
        <p className="font-merriweather italic text-center w-full text-primary text-lg">
          Assista o vídeo
        </p>
        <Video
          className="mt-10 rounded-sm"
          style={{ borderRadius: "32px" }}
          src={videoSample}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      {showConfirmButton && (
        <div className="flex flex-col h-full justify-end items-center mt-36 flex-1">
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
