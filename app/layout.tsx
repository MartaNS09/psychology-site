import Script from "next/script";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import { PwaRegister } from "@/components/PwaRegister";
import { Header } from "@/components/layout/Header";
import { AriaLiveWelcome } from "@/components/a11y/AriaLiveWelcome";
import { FloatingActions } from "@/components/FloatingActions/FloatingActions";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { generateRootMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.scss";
import { Playfair_Display, Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return generateRootMetadata();
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A3C34" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var e=document.documentElement,t=localStorage.getItem("theme");if(/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1))e.classList.add("is-ios");if(t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches))e.setAttribute("data-theme","dark");else e.setAttribute("data-theme","light")}catch(e){}})();`}
        </Script>
        <ThemeProvider>
          <Header />
          <div className="site-shell">
            <PwaRegister />
            <AriaLiveWelcome />
            <a href="#main-content" className="skip-link">
              Перейти к основному содержимому
            </a>
            <div className="site-shell__body">{children}</div>
          </div>
          <PwaInstallPrompt />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
