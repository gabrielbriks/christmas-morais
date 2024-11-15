"use client";
import { CldVideoPlayer, getCldVideoUrl } from "next-cloudinary";
// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function CloudPlayer() {
  const url = getCldVideoUrl({
    width: 960,
    height: 600,
    src: "samples/cld-sample-video",
  });

  return <CldVideoPlayer id="default" width="1920" height="auto" src={url} />;
}
