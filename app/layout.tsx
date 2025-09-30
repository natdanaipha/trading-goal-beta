import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Quicksand } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LayoutClient } from "./layout-client"
import { Suspense } from "react"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Banana Trading",
  description: "Trading app for currency pairs with market condition analysis",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#facc15",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Banana Trading",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Banana Trading",
    title: "Banana Trading",
    description: "Trading app for currency pairs with market condition analysis",
  },
  twitter: {
    card: "summary",
    title: "Banana Trading",
    description: "Trading app for currency pairs with market condition analysis",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Banana Trading" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Banana Trading" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#030303" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#facc15" />

        <link rel="apple-touch-icon" href="/images/banana-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/banana-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/banana-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/images/banana-logo.png" />

        <style>{`
html {
  font-family: ${nunito.style.fontFamily};
  --font-sans: ${nunito.style.fontFamily};
  --font-mono: ${quicksand.style.fontFamily};
}
        `}</style>
      </head>
      <body className={`${nunito.variable} ${quicksand.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutClient>{children}</LayoutClient>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
