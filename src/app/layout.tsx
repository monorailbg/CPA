import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CPA Exam Prep — AI-Powered Study Trainer",
  description: "Master the CPA exam with AI-powered MCQs, flashcards, simulations, and blind spot analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} style={{ minHeight: '100vh', width: '100%' }}>
      <body style={{ minHeight: '100vh', width: '100%', backgroundColor: '#fdfbf7', margin: 0, padding: 0 }}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
