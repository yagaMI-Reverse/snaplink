"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { ArrowLeft, BarChart3, Link2, RefreshCw } from "lucide-react";

type Stats = {
  totals: { links: number; clicks: number; topCountry: string };
  series: { date: string; clicks: number }[];
  countries: { label: string; value: number }[];
  devices: { label: string; value: number }[];
  referrers: { label: string; value: number }[];
  links: { slug: string; url: string; clicks: number; createdAt: string }[];
};

const BARS = ["#22C55E", "#16A34A", "#4ADE80", "#15803D", "#86EFAC", "#166534"];

export default function Dashboard() {
  const [data, setData] = useState<Stats | null>(null);
  const load = () => fetch("/api/stats").then((r) => r.json()).then(setData).catch(() => setData(null));
  useEffect(() => { void load(); }, []);

  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-bg"><Link2 className="h-4 w-4" aria-hidden /></span>
            snaplink
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={load} className="btn-ghost !px-3 !py-2" aria-label="Refresh"><RefreshCw className="h-4 w-4" aria-hidden /></button>
            <Link href="/" className="btn-ghost !px-4 !py-2"><ArrowLeft className="h-4 w-4" aria-hidden /> Home</Link>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold"><BarChart3 className="h-6 w-6 text-accent" aria-hidden /> Analytics</h1>

        {/* KPIs */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total links", value: data?.totals.links ?? "—" },
            { label: "Total clicks (14d)", value: data?.totals.clicks ?? "—" },
            { label: "Top country", value: data?.totals.topCountry ?? "—" },
          ].map((k) => (
            <div key={k.label} className="card p-5">
              <div className="font-mono text-3xl font-bold text-accent">{k.value}</div>
              <div className="mt-1 text-xs text-ink-faint">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Trend */}
        <div className="card mt-6 p-5">
          <h2 className="text-sm font-semibold text-ink-dim">Clicks · last 14 days</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.series ?? []} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2A3D" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#F8FAFC" }} />
                <Area type="monotone" dataKey="clicks" stroke="#22C55E" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Breakdowns */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {([
            { title: "Top countries", rows: data?.countries },
            { title: "Devices", rows: data?.devices },
            { title: "Referrers", rows: data?.referrers },
          ] as const).map((b) => (
            <div key={b.title} className="card p-5">
              <h2 className="text-sm font-semibold text-ink-dim">{b.title}</h2>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={b.rows ?? []} layout="vertical" margin={{ left: 8, right: 16 }}>
                    <XAxis type="number" hide allowDecimals={false} />
                    <YAxis type="category" dataKey="label" width={80} stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: "#27314220" }} contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {(b.rows ?? []).map((_, i) => <Cell key={i} fill={BARS[i % BARS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {(!b.rows || b.rows.length === 0) && <p className="text-xs text-ink-faint">No data yet.</p>}
            </div>
          ))}
        </div>

        {/* Links table */}
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line-soft font-mono text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-5 py-3.5 font-semibold">Short</th>
                <th className="px-5 py-3.5 font-semibold">Destination</th>
                <th className="px-5 py-3.5 text-right font-semibold">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {data?.links.map((l) => (
                <tr key={l.slug} className="border-b border-line-soft/60 last:border-0 hover:bg-muted/40">
                  <td className="px-5 py-3.5"><a href={`/${l.slug}`} target="_blank" rel="noreferrer" className="font-mono text-accent hover:underline">/{l.slug}</a></td>
                  <td className="max-w-[320px] truncate px-5 py-3.5 font-mono text-xs text-ink-dim">{l.url}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-semibold">{l.clicks}</td>
                </tr>
              ))}
              {data && data.links.length === 0 && (
                <tr><td colSpan={3} className="px-5 py-10 text-center text-ink-faint">No links yet — shorten one on the home page.</td></tr>
              )}
              {!data && <tr><td colSpan={3} className="px-5 py-10 text-center text-ink-faint">Loading…</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
