import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sou Jogador Caro - Calcule sua AURA",
  description: "Descubra o valor do seu Passe Digital e mostre seu potencial para marcas e times locais.",
  openGraph: {
    title: "Sou Jogador Caro - Calcule sua AURA",
    description: "Descubra o valor do seu Passe Digital e mostre seu potencial para marcas e times locais.",
    url: "https://soujogadorcaro.pro",
    siteName: "Sou Jogador Caro",
    images: [
      {
        url: "https://soujogadorcaro.pro/og-image.jpg", // Quando você tiver um banner, salve na pasta public como og-image.jpg
        width: 1200,
        height: 630,
        alt: "Capa do Sou Jogador Caro",
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sou Jogador Caro - Calcule sua AURA",
    description: "Descubra o valor do seu Passe Digital e mostre seu potencial.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
