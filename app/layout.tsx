import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  title: "Snaplink — Short links with real analytics",
  description:
    "Shorten any URL and see who clicks: clicks over time, top countries, devices and referrers. Built on Next.js + Prisma + PostgreSQL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbmono.variable}`}>
      <body>
        <div className="aurora" aria-hidden="true">
          <div
            className="aurora-blob"
            style={{
              width: 620,
              height: 620,
              top: "-18%",
              left: "-10%",
              background: "radial-gradient(circle, rgba(139,92,246,.65), transparent 65%)",
            }}
          />
          <div
            className="aurora-blob"
            style={{
              width: 520,
              height: 520,
              top: "8%",
              right: "-12%",
              background: "radial-gradient(circle, rgba(232,121,249,.45), transparent 65%)",
              animationDelay: "-10s",
            }}
          />
          <div
            className="aurora-blob"
            style={{
              width: 560,
              height: 560,
              bottom: "-22%",
              left: "28%",
              background: "radial-gradient(circle, rgba(34,211,238,.4), transparent 65%)",
              animationDelay: "-20s",
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
