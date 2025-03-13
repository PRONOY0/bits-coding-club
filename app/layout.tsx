import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar/page"
import SessionProviderWrapper from "@/components/SessionProviderWrapper/SessionProviderWrapper"
import { Toaster } from "sonner"
import { Providers } from "./providers";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700', '900'], // Choose required weights
  style: ['normal', 'italic'], // Optional: italic styles
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: "BITS Pilani Coding Club",
  description: "Official website of the Coding Club of BITS Pilani BSc Computer Science",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProviderWrapper>
        <body className={montserrat.className}>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Toaster />
          </Providers>
        </body>
      </SessionProviderWrapper>
    </html>
  )
}

