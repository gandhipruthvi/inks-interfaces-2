import React from "react";
import "@/styles/globals.css";

import localFont from "next/font/local";
import { type Metadata } from "next";
import {
  AnalyticsTracker,
  ErrorBoundaryClient,
  DOMInspector,
  Branding,
} from "@/utils/creatr.scripts";
import { GlobalErrorHandler } from "@/utils/global-error-handler";
import Footer from "@/components/ui/Footer";



// Create a proper React component wrapper
const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const ErrorBoundaryComponent =
    ErrorBoundaryClient as unknown as React.ComponentType<any>;
  return <ErrorBoundaryComponent {...props} />;
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Inks & Interfaces",
    template: "%s | Inks & Interfaces",
  },
  description: "Where Pixels Meet Personality - A creative portfolio showcasing UI/UX and brand identity projects",
  applicationName: "Inks & Interfaces",
  keywords: ["design", "UI/UX", "branding", "portfolio", "creative", "interfaces", "animation"],
  authors: [{ name: "Inks & Interfaces" }],
  creator: "Inks & Interfaces",
  publisher: "Inks & Interfaces",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Inks & Interfaces",
  },
  formatDetection: {
    telephone: false,
  },
};

// Load Filson Pro font
const filsonPro = localFont({
  src: [
    {
      path: '../fonts/filsonProRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/filsonProMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/filsonProBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-filson-pro',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${filsonPro.variable} scroll-smooth`}>
      <body className="antialiased font-filson">
        <GlobalErrorHandler />
        <DOMInspector>
          <ErrorBoundaryWrapper>
            {children}
            <Footer />
            <Branding />
          </ErrorBoundaryWrapper>
          <AnalyticsTracker siteKey="${siteKey}" />
        </DOMInspector>
      </body>
    </html>
  );
}
