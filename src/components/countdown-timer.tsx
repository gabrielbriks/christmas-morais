import { useEffect, useState } from "react";

const CountdownTimer = () => {
  // Define a data do evento no horário de Brasília (UTC-3)
  const targetDate = new Date("2024-12-25T12:45:00-03:00").getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    const nowTime = new Date(now).getTime();
    const difference = targetDate - nowTime;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-2 text-center">
        Contagem Regressiva
      </h2>
      <div className="flex gap-4 text-3xl font-semibold text-gray-800">
        <div>
          <span>{timeLeft.days}</span> <span className="text-sm">dias</span>
        </div>
        <div>
          <span>{timeLeft.hours}</span> <span className="text-sm">horas</span>
        </div>
        <div>
          <span>{timeLeft.minutes}</span> <span className="text-sm">min</span>
        </div>
        <div>
          <span>{timeLeft.seconds}</span> <span className="text-sm">seg</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
