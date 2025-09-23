"use client"

import type React from "react"
import { Suspense } from "react"

export function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Service worker registration can be added back in production environment

  return <Suspense fallback={null}>{children}</Suspense>
}
