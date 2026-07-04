import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });
const firaSans = Fira_Sans({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-fira-sans" });

export const metadata: Metadata = {
  title: "Snaplink — Short links with real analytics",
  description:
    "Shorten any URL and see who clicks: clicks over time, top countries, devices and referrers. Built on Next.js + Prisma + PostgreSQL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${firaCode.variable} ${firaSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
