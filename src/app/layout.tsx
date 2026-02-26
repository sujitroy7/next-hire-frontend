import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthInitializer from "@/components/shared/AuthInitializer";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ReduxProviders = dynamic(() =>
  import("@/store/Providers").then((mod) => mod.Providers),
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextHire | Job Listing Platform",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <Toaster />
          <Suspense>
            <ReduxProviders>
              <AuthInitializer />
              {children}
            </ReduxProviders>
          </Suspense>
        </NuqsAdapter>
      </body>
    </html>
  );
}
