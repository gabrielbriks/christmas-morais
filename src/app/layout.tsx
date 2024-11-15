import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Cinzel_Decorative, Merriweather } from "next/font/google";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cinzel",
});

const merriweather = Merriweather({
  subsets: ["latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Natal Morais",
  description: "Natal Morais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${merriweather.variable} ${cinzelDecorative.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
