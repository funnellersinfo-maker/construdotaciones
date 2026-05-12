import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CONSTRUDOTACIONES | Dotaciones Industriales & Seguridad Industrial en Cartagena",
  description:
    "Trabajamos unidos por su seguridad, con más de 10 años de experiencia. Dotaciones industriales, seguridad industrial, bordados, estampados, extintores, abrasivos y señalización. Enviamos a toda Colombia.",
  keywords: [
    "dotaciones industriales",
    "seguridad industrial",
    "Cartagena",
    "Colombia",
    "uniformes industriales",
    "extintores",
    "señalización",
    "bordados",
    "ESTAMPADOS",
    "abrasivos",
    "CONSTRUDOTACIONES",
  ],
  authors: [{ name: "CONSTRUDOTACIONES SAS" }],
  openGraph: {
    title: "CONSTRUDOTACIONES | Más de 10 años de experiencia",
    description:
      "Dotaciones industriales, seguridad industrial, bordados, estampados, extintores, abrasivos y señalización en Cartagena.",
    url: "https://construdotaciones.com",
    siteName: "CONSTRUDOTACIONES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground grain-overlay`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
