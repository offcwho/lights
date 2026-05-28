import type { Metadata } from "next";
import { SN_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header";
import { Providers } from "@/components/Providers";

const SNPro = SN_Pro({
  variable: "--font-sn-pro",
  subsets: ["cyrillic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "LUMEN - Световые решения для вашего дома",
  description: "Высокое качество светильников для современного дома. Откройте нашу коллекцию уникальных светильников.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${SNPro.variable} h-full antialiased dark`}
    >
      <Providers>
        <body className="min-h-full flex flex-col">
          <Header />
          <main>
            {children}
          </main>
        </body>
      </Providers>
    </html>
  );
}
