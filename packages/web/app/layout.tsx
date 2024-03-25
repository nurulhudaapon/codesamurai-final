import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EcosyncLogger } from "@ecosync/logger";

globalThis.console = new EcosyncLogger({ name: "Web" }).init();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcoSync",
  description: "An app to to bridge the gaps, streamline processes, and enhance accountability through technological innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
