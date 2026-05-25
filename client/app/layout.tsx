'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import { useState } from "react";
import Footer from "./components/skeleton/Footer";
import Header from "./components/skeleton/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} !bg-white dark:bg-gradient-to-b duration-700`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header open={open} setOpen={() => { setOpen(!open) }} />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
