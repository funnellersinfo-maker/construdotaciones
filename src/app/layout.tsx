import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CONSTRUDOTACIONES | Dotaciones Industriales y Seguridad en Cartagena",
  description:
    "Más de 10 años de experiencia en dotaciones industriales, seguridad industrial, bordados, estampados, extintores, abrasivos y señalización. Enviamos a toda Colombia.",
  keywords: [
    "dotaciones industriales",
    "seguridad industrial",
    "Cartagena",
    "Colombia",
    "uniformes industriales",
    "extintores",
    "señalización",
    "bordados",
    "estampados",
    "abrasivos",
    "CONSTRUDOTACIONES",
  ],
  authors: [{ name: "CONSTRUDOTACIONES SAS" }],
  openGraph: {
    title: "CONSTRUDOTACIONES | Dotaciones Industriales y Seguridad en Cartagena",
    description:
      "Más de 10 años de experiencia. Dotaciones industriales, seguridad industrial, bordados, estampados, extintores, abrasivos y señalización en Cartagena, Colombia.",
    url: "https://construdotaciones.com",
    siteName: "CONSTRUDOTACIONES",
    type: "website",
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "CONSTRUDOTACIONES | Dotaciones Industriales y Seguridad",
    description:
      "Más de 10 años de experiencia en dotaciones industriales y seguridad industrial en Cartagena.",
  },
  robots: {
    index: true,
    follow: true,
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
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1186956072190174');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}} src="https://www.facebook.com/tr?id=1186956072190174&ev=PageView&noscript=1" alt="" />
        </noscript>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
