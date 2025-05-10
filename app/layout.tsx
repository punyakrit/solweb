import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
import Header from "@/components/Header";
import Provider from "@/lib/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SolWeb | Solana Web Explorer",
  description: "A simple and intuitive Solana blockchain explorer by SolWeb",
  keywords: ["Solana", "blockchain", "explorer", "crypto", "web3", "SolWeb"],
  authors: [{ name: "SolWeb Team" }],
  creator: "SolWeb",
  publisher: "SolWeb",
  metadataBase: new URL("https://solweb.app"),
  openGraph: {
    title: "SolWeb | Solana Web Explorer",
    description: "A simple and intuitive Solana blockchain explorer by SolWeb",
    url: "https://solweb.app",
    siteName: "SolWeb",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SolWeb - Solana Web Explorer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SolWeb | Solana Web Explorer",
    description: "A simple and intuitive Solana blockchain explorer by SolWeb",
    creator: "@solweb",
    images: ["/twitter-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#8b5cf6",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
              <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-950 to-slate-950 text-white">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
                  <div className="absolute bottom-40 right-20 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
                </div>
                <Provider>{children}</Provider>
              </div>
            
      </body>
    </html>
  );
}
