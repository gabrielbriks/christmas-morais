"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import { LoadingDefault } from "./loading-default";

interface CountdownProps {
  targetDate: Date;
}

const ElegantCountdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        Dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <div
        key={interval}
        className="flex flex-col items-center mx-2 mt-2 max-sm:mx-1 "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={timeLeft[interval]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-bold text-[#cf3b38]"
          >
            {timeLeft[interval]}
          </motion.div>
        </AnimatePresence>
        <div className="text-sm uppercase text-zinc-200">{interval}</div>
      </div>
    );
  });

  return (
    <Suspense fallback={<LoadingDefault />}>
      <div className="flex flex-wrap justify-center items-center p-4 bg-transparent text-[#cf3b38] ">
        {timeComponents.length ? (
          timeComponents
        ) : (
          <span className="text-3xl text-white">O Dia Chegou!</span>
        )}
      </div>
    </Suspense>
  );
};

export default ElegantCountdown;
