import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";
import { profileImage, siteName, siteUrl } from "@/lib/seo";

export const alt = `${siteName} developer portfolio`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  const portraitUrl = `${siteUrl}${profileImage}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#070707",
          color: "#f6f7f9",
          padding: "56px",
          fontFamily: "Arial, Helvetica, sans-serif",
          backgroundImage:
            "radial-gradient(circle at 78% 38%, rgba(255,255,255,0.08), transparent 260px), repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 8px)",
        }}
      >
        <div
          style={{
            width: "64%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#b7b7b7",
            }}
          >
            <span>{profile.role}</span>
            <span
              style={{
                width: 68,
                height: 1,
                background: "rgba(255,255,255,0.25)",
              }}
            />
            <span>PH</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 82,
                lineHeight: 0.9,
                letterSpacing: -2,
                textTransform: "uppercase",
              }}
            >
              {profile.headline}
            </h1>
            <div
              style={{
                width: 540,
                height: 1,
                marginTop: 30,
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <p
              style={{
                maxWidth: 650,
                margin: "26px 0 0",
                fontSize: 27,
                lineHeight: 1.35,
                color: "#dedede",
              }}
            >
              {profile.tagline}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#b7b7b7",
            }}
          >
            <span>euel.dev</span>
          </div>
        </div>

        <div
          style={{
            width: "36%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            border: "1px solid rgba(255,255,255,0.16)",
            background: "#101010",
            overflow: "hidden",
          }}
        >
          <img
            src={portraitUrl}
            alt=""
            width="432"
            height="432"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: 390,
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(7,7,7,0.72)",
              padding: "14px 18px",
              fontSize: 15,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            <span>{profile.shortName}</span>
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
