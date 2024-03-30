import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EcosyncLogger } from "@ecosync/logger";
import { Logger } from "@/components";
import "../style/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastInitializer } from "@/components/toast";

globalThis.console = new EcosyncLogger({ name: "Web" }).init();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSync code-samurai",
  description: "Codesamurai's Ecosync project - 2 phase competition",
  icons: [
    {
      url: "./favicon.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Logger>
        <html lang="en">
          <body className={inter.className}>
            <ToastInitializer />
            {children}
          </body>
        </html>
      </Logger>
    </AuthProvider>
  );
}
