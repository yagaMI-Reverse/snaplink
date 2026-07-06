"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowLeft,
  BarChart3,
  Globe2,
  Link2,
  MonitorSmartphone,
  MousePointerClick,
  RefreshCw,
  Share2,
} from "lucide-react";
import CountUp from "@/components/CountUp";

type Stats = {
  totals: { links: number; clicks: number; topCountry: string };
  series: { date: string; clicks: number }[];
  countries: { label: string; value: number }[];
  devices: { label: string; value: number }[];
  referrers: { label: string; value: number }[];
  links: { slug: string; url: string; clicks: number; createdAt: string }[];
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const BARS = ["#8b5cf6", "#a78bfa", "#e879f9", "#22d3ee", "#67e8f9", "#c4b5fd"];
const TOOLTIP_STYLE = {
  background: "#12121f",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 10,
  fontSize: 12,
} as const;

export default function Dashboard() {
  const [data, setData] = useState<Stats | null>(null);
  const [spinning, setSpinning] = useState(false);

  const load = () => {
    setSpinning(true);
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setTimeout(() => setSpinning(false), 500));
  };
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxClicks = Math.max(1, ...(data?.links.map((l) => l.clicks) ?? [1]));

  const kpis = [
    {
      icon: Link2,
      label: "Total links",
      value: data ? <CountUp value={data.totals.links} /> : "—",
      color: "text-accent",
    },
    {
      icon: MousePointerClick,
      label: "Total clicks (14d)",
      value: data ? <CountUp value={data.totals.clicks} /> : "—",
      color: "text-fuchsia",
    },
    {
      icon: Globe2,
      label: "Top country",
      value: data?.totals.topCountry ?? "—",
      color: "text-cyan",
    },
  ];

  const breakdowns = [
    { title: "Top countries", icon: Globe2, rows: data?.countries },
    { title: "Devices", icon: MonitorSmartphone, rows: data?.devices },
    { title: "Referrers", icon: Share2, rows: data?.referrers },
  ] as const;

  return (
    <main className="min-h-dvh pb-16">
      {/* header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="sticky top-4 z-40"
      >
        <div className="container-page">
          <div className="card flex h-14 items-center justify-between !rounded-2xl px-4">
            <Link href="/" className="flex items-center gap-2.5 font-mono text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet to-fuchsia text-white shadow-glow">
                <Link2 className="h-4 w-4" aria-hidden />
              </span>
              snap<span className="gradient-text">link</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={load}
                className="btn-ghost !px-3 !py-2"
                aria-label="Refresh data"
              >
                <RefreshCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} aria-hidden />
              </button>
              <Link href="/" className="btn-ghost !px-4 !py-2">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Home
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container-page pt-10">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex items-center gap-3 text-3xl font-extrabold"
        >
          <BarChart3 className="h-7 w-7 text-accent" aria-hidden />
          Live <span className="gradient-text">analytics</span>
        </motion.h1>

        {/* KPIs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: easeOut, delay: i * 0.08 }}
              className="card card-hover p-5"
            >
              <div className="flex items-center justify-between">
                <div className={`font-mono text-4xl font-bold ${k.color}`}>{k.value}</div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <k.icon className={`h-5 w-5 ${k.color}`} aria-hidden />
                </span>
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-ink-faint">{k.label}</div>
            </motion.div>
          ))}
        </div>

        {/* trend */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
          className="card mt-6 p-5"
        >
          <h2 className="flex items-center gap-2 text-sm font-bold text-ink-dim">
            <MousePointerClick className="h-4 w-4 text-fuchsia" aria-hidden />
            Clicks · last 14 days
          </h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.series ?? []} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="auroraFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.45} />
                    <stop offset="60%" stopColor="#e879f9" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="auroraStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="55%" stopColor="#e879f9" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" stroke="#6e7191" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#6e7191" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ color: "#f2f2fa" }} />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="url(#auroraStroke)"
                  strokeWidth={2.5}
                  fill="url(#auroraFill)"
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* breakdowns */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {breakdowns.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.3 + i * 0.08 }}
              className="card p-5"
            >
              <h2 className="flex items-center gap-2 text-sm font-bold text-ink-dim">
                <b.icon className="h-4 w-4 text-accent" aria-hidden />
                {b.title}
              </h2>
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...(b.rows ?? [])]} layout="vertical" margin={{ left: 8, right: 16 }}>
                    <XAxis type="number" hide allowDecimals={false} />
                    <YAxis
                      type="category"
                      dataKey="label"
                      width={80}
                      stroke="#a6a8c2"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={TOOLTIP_STYLE} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} animationDuration={900}>
                      {(b.rows ?? []).map((_, j) => (
                        <Cell key={j} fill={BARS[j % BARS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {(!b.rows || b.rows.length === 0) && (
                <p className="text-xs text-ink-faint">No data yet.</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* links table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.5 }}
          className="card mt-6 overflow-x-auto"
        >
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-line-soft font-mono text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-5 py-3.5 font-semibold">Short</th>
                <th className="px-5 py-3.5 font-semibold">Destination</th>
                <th className="px-5 py-3.5 font-semibold">Traffic</th>
                <th className="px-5 py-3.5 text-right font-semibold">Clicks</th>
              </tr>
            </thead>
            <tbody>
              {data?.links.map((l) => (
                <tr
                  key={l.slug}
                  className="border-b border-line-soft/60 transition-colors duration-150 last:border-0 hover:bg-muted/40"
                >
                  <td className="px-5 py-3.5">
                    <a
                      href={`/${l.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono font-semibold text-accent underline-offset-2 hover:underline"
                    >
                      /{l.slug}
                    </a>
                  </td>
                  <td className="max-w-[300px] truncate px-5 py-3.5 font-mono text-xs text-ink-dim">
                    {l.url}
                  </td>
                  <td className="w-[160px] px-5 py-3.5">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(l.clicks / maxClicks) * 100}%` }}
                        transition={{ duration: 0.9, ease: easeOut, delay: 0.6 }}
                        className="h-full rounded-full bg-gradient-to-r from-violet via-fuchsia to-cyan"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold">{l.clicks}</td>
                </tr>
              ))}
              {data && data.links.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-ink-faint">
                    No links yet — shorten one on the home page.
                  </td>
                </tr>
              )}
              {!data && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-ink-faint">
                    Loading…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </main>
  );
}
