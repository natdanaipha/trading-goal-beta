"use client"

import type React from "react"

import { Analytics } from "@vercel/analytics/next"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const searchParams = useSearchParams()

  return (
    <>
      {/* <CHANGE> Added PWA meta tags */}
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

      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `,
        }}
      />

      <Suspense fallback={null}>{children}</Suspense>
      <Analytics />
    </>
  )
}
