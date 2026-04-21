import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get("title") ?? "AIvett"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundImage: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #f5f3ff 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1d4ed8",
            marginBottom: "20px",
            letterSpacing: "-0.5px",
          }}
        >
          AI<span style={{ color: "#1e40af" }}>vett</span>
        </div>
        <div
          style={{
            fontSize: title.length > 50 ? "42px" : "54px",
            fontWeight: "bold",
            color: "#0a0a0a",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "20px",
            color: "#6b7280",
          }}
        >
          Lær kunstig intelligens på norsk · aivett.no
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
