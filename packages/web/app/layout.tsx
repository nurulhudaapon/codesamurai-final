import { ToastInitializer } from "@/components/toast";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.css";

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
        <html lang="en">
          <body className={inter.className}>
            <ToastInitializer />
            {children}
          </body>
        </html>
    </AuthProvider>
  );
}
