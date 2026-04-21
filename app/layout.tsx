import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import { PortfolioLoader } from "@/components/portfolio-loader"
import { getSiteCopy, getSiteLists } from "@/lib/actions/content"
import { getRequestLocale } from "@/lib/locale"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-creative",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-technical",
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const copy = await getSiteCopy(locale)
  const title = copy["site.meta.title"] || "Portfolio"
  const description = copy["site.meta.description"] || ""
  const ogTitle = copy["site.meta.og_title"] || title
  const ogDescription = copy["site.meta.og_description"] || description

  return {
    title,
    description,
    generator: "matteoquintero",
    metadataBase: new URL("https://matteoquintero.com"),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: "https://matteoquintero.com",
      siteName: ogTitle,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: locale === "en" ? "en_US" : "es_CO",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/og-image.jpg"],
    },
    icons: {
      icon: [
        { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getRequestLocale()
  const [copy, lists] = await Promise.all([getSiteCopy(locale), getSiteLists(locale)])

  return (
    <html lang={locale} className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <PortfolioLoader copy={copy} lists={lists} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
