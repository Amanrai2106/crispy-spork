import type { Metadata } from "next";
import { Inter, Aboreto } from "next/font/google";
import "./globals.css";
import ScrollProvider from "@/hooks/ScrollProvider";
import ScrollToTop from "@/components/ScrollToTop";

// Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Aboreto
const aboreto = Aboreto({
  variable: "--font-aboreto",
  subsets: ["latin"],
  weight: "400", // Aboreto only has one weight
  display: "swap",
});

export const metadata: Metadata = {
  title: "Signsol Design",
  description: "High-impact signage solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${aboreto.variable} antialiased`}>
        <ScrollProvider>
          {children}
          <ScrollToTop />
        </ScrollProvider>
      </body>
    </html>
  );
}
