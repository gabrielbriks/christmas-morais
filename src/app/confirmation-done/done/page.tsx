"use client";
import Confetti from "@/src/components/confetti";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DoneConfirmationPage() {
  const [showGif, setShowGif] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowGif(true), 500);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  return (
    <div className="flex w-full h-full min-h-screen justify-center items-center px-2 ">
      <Card className="w-full max-w-md mx-auto mb-4 font-merriweather">
        <CardHeader>
          <CardTitle className="text-xl w-full text-center">
            ✅ Sua presença está confirmada!🎉
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full justify-center flex flex-col gap-4 items-center">
          <p className="w-full text-center">
            Estamos muito contentes em saber que estará com a gente nesse dia
            especial.
          </p>
          <p className="w-full text-center">Até lá! ❤️</p>
          <Image
            className="rounded-md"
            alt="excited-for-natal-morais"
            width={306}
            height={354}
            src={"/empolgado-thanks.gif"}
          />
          {showConfetti && <Confetti />}
        </CardContent>
      </Card>
    </div>
  );
}
