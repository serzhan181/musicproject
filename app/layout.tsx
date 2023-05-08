import { Inter } from "next/font/google";
import { Header } from "../components/layout/header";

import "./globals.css";
import { TailwindIndicator } from "@/providers/tailwind-indicator";
import AuthSessionProvider from "@/providers/auth-session.provider";
import { Player } from "@/components/player";
import { ReduxProvider } from "@/providers/redux-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Music.",
  description: "ValPrem - is the webiste.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthSessionProvider>
          <ReduxProvider>
            <Header />
            <main className="container mx-auto mt-5">{children}</main>
            <TailwindIndicator />

            {/* Player */}
            <Player />
          </ReduxProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
