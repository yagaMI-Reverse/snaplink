"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Globe2,
  Link2,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import ShortenBox from "@/components/ShortenBox";
import LiveStats from "@/components/LiveStats";

const easeOut = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    icon: Zap,
    title: "Instant shortening",
    text: "Clean 6-character slugs generated on the fly — no ambiguous 0/O or 1/l, ever.",
    glow: "group-hover:text-accent",
  },
  {
    icon: MousePointerClick,
    title: "Every click, an event",
    text: "Each visit is logged individually, so your analytics are exact — not estimated.",
    glow: "group-hover:text-fuchsia",
  },
  {
    icon: BarChart3,
    title: "Clicks over time",
    text: "A 14-day trend shows exactly when your links get traffic, at a glance.",
    glow: "group-hover:text-cyan",
  },
  {
    icon: Globe2,
    title: "Geo & devices",
    text: "Top countries plus the split across desktop, mobile and tablet.",
    glow: "group-hover:text-accent",
  },
  {
    icon: Link2,
    title: "Referrers",
    text: "Know which sites and platforms actually send you the traffic.",
    glow: "group-hover:text-fuchsia",
  },
  {
    icon: ShieldCheck,
    title: "Redirects never block",
    text: "If logging ever fails, the visitor still lands instantly. Analytics stay out of the way.",
    glow: "group-hover:text-cyan",
  },
];

export default function Landing() {
  return (
    <main>
      {/* nav */}
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
            <nav className="hidden items-center gap-6 text-sm text-ink-dim sm:flex" aria-label="Main">
              <a href="#features" className="transition-colors duration-200 hover:text-accent">
                Features
              </a>
              <a href="#how" className="transition-colors duration-200 hover:text-accent">
                How it works
              </a>
              <a
                href="https://github.com/yagaMI-Reverse/snaplink"
                className="transition-colors duration-200 hover:text-accent"
              >
                Source
              </a>
            </nav>
            <Link href="/dashboard" className="btn-ghost !px-4 !py-2">
              <BarChart3 className="h-4 w-4" aria-hidden /> Dashboard
            </Link>
          </div>
        </div>
      </motion.header>

      {/* hero */}
      <section className="container-page pb-16 pt-16 text-center lg:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs text-ink-dim backdrop-blur-xl"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
          Next.js · Prisma · PostgreSQL — every click stored for real
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
          className="mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Short links.
          <br />
          <span className="gradient-text">Loud analytics.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.16 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-dim"
        >
          Shorten any URL in a click — then watch who opens it: clicks over
          time, countries, devices and referrers. Live, exact, yours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.24 }}
          className="mt-10 flex justify-center"
        >
          <ShortenBox />
        </motion.div>

        <div className="mt-12">
          <LiveStats />
        </div>
      </section>

      {/* features */}
      <section id="features" className="py-16">
        <div className="container-page">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="text-center text-3xl font-extrabold sm:text-4xl"
          >
            Everything you&apos;d expect — <span className="gradient-text">plus the data</span>
          </motion.h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: easeOut, delay: (i % 3) * 0.08 }}
                className="card card-hover group p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-ink-dim transition-colors duration-300 group-hover:bg-violet/15">
                  <f.icon className={`h-5 w-5 transition-colors duration-300 ${f.glow}`} aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="container-page py-16">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="text-center text-3xl font-extrabold sm:text-4xl"
        >
          Three steps, zero friction
        </motion.h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            {
              n: "01",
              t: "Paste & shorten",
              d: "Drop in any URL — a short link lands in PostgreSQL via Prisma instantly.",
              c: "text-accent",
            },
            {
              n: "02",
              t: "Share anywhere",
              d: "Every open hits the redirect route, which logs the click as an event.",
              c: "text-fuchsia",
            },
            {
              n: "03",
              t: "Watch it live",
              d: "The dashboard turns raw events into trends, geo, devices and referrers.",
              c: "text-cyan",
            },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, ease: easeOut, delay: i * 0.1 }}
              className="card card-hover p-6"
            >
              <div className={`font-mono text-2xl font-bold ${s.c}`}>{s.n}</div>
              <h3 className="mt-2 text-lg font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.d}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <Link href="/dashboard" className="btn-accent !px-8 !py-4 text-base">
            <BarChart3 className="h-5 w-5" aria-hidden /> Open the live dashboard
          </Link>
        </motion.div>
      </section>

      {/* footer */}
      <footer className="border-t border-line-soft py-10">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-sm text-ink-faint sm:flex-row">
          <span className="flex items-center gap-2 font-mono font-bold text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet to-fuchsia text-white">
              <Link2 className="h-3 w-3" aria-hidden />
            </span>
            snaplink
          </span>
          <span className="font-mono text-xs">
            Built by Ilya Shapovalov · Next.js · Prisma · PostgreSQL
          </span>
        </div>
      </footer>
    </main>
  );
}
