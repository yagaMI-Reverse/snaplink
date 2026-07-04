import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DAYS = 14;

export async function GET() {
  const [links, clicks] = await Promise.all([
    prisma.link.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { _count: { select: { clicks: true } } },
    }),
    prisma.click.findMany({
      where: { createdAt: { gte: new Date(Date.now() - DAYS * 86400000) } },
      select: { country: true, device: true, referrer: true, createdAt: true },
    }),
  ]);

  // Clicks per day (last 14 days), zero-filled.
  const byDay = new Map<string, number>();
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    byDay.set(d, 0);
  }
  const tally = (arr: string[]) => {
    const m = new Map<string, number>();
    for (const v of arr) m.set(v, (m.get(v) ?? 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, value]) => ({ label, value }));
  };

  for (const c of clicks) {
    const key = c.createdAt.toISOString().slice(0, 10);
    if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }

  return NextResponse.json({
    totals: {
      links: links.length,
      clicks: clicks.length,
      topCountry: tally(clicks.map((c) => c.country))[0]?.label ?? "—",
    },
    series: [...byDay.entries()].map(([date, clicks]) => ({
      date: date.slice(5),
      clicks,
    })),
    countries: tally(clicks.map((c) => c.country)),
    devices: tally(clicks.map((c) => c.device)),
    referrers: tally(clicks.map((c) => c.referrer)),
    links: links.map((l) => ({ slug: l.slug, url: l.url, clicks: l._count.clicks, createdAt: l.createdAt.toISOString() })),
  });
}
