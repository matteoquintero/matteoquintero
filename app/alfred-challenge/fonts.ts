import localFont from "next/font/local"

// Gotham is a commercial typeface. These .woff2 files are colocalized here
// (copied from the Alfred brand kit) purely as brand reference for this
// internal deliverable page. Never imported outside app/alfred-challenge.
export const gotham = localFont({
  src: [
    {
      path: "./fonts/Gotham-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Gotham-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Gotham-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Gotham-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Gotham-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gotham",
  display: "swap",
})
