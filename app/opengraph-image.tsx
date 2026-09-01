import { ImageResponse } from "next/og";
import { SITE_NAME } from "./lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            color: "#ededed",
            letterSpacing: "-0.02em",
          }}
        >
          ETHAN NERWAL
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#d99a4e",
          }}
        >
          Full stack developer — elevating businesses through better software
        </div>
      </div>
    ),
    { ...size }
  );
}
