import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"
export const runtime = "edge"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 4 28 L 4 4 L 9 4 L 16 16 L 23 4 L 28 4 L 28 28 L 23 28 L 23 12 L 17 20 L 15 20 L 9 12 L 9 28 Z"
            fill="#fff"
          />
        </svg>
      </div>
    ),
    size,
  )
}
