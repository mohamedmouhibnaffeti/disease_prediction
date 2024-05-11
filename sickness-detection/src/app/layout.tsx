import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav";
import { Providers } from "./Providers";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster"
import Loader from "@/components/Loader";

export const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-sickness-lightGray font-sans antialiased overflow-x-hidden",
          inter.variable
        )}>
          <Nav />
          <Providers>
            <Suspense fallback={<Loader />}>
              {children}
              <Toaster />
            </Suspense>
          </Providers>
      </body>
    </html>
  );
}
