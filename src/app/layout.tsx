import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CPA Exam Prep — AI-Powered Study Trainer",
  description: "Master the CPA exam with AI-powered MCQs, flashcards, simulations, and blind spot analytics for FAR, AUD, REG, and discipline sections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body
        className="h-full"
        style={{ backgroundColor: '#fdfbf7', minHeight: '100vh', width: '100%' }}
      >
        {children}
      </body>
    </html>
  );
}
