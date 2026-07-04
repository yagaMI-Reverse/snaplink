import Link from "next/link";
import { BarChart3, Globe2, Link2, MousePointerClick, Server, ShieldCheck, Zap } from "lucide-react";
import ShortenBox from "@/components/ShortenBox";

export default function Landing() {
  return (
    <main>
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-mono text-lg font-semibold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-bg">
              <Link2 className="h-4 w-4" aria-hidden />
            </span>
            snaplink
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-ink-dim sm:flex" aria-label="Main">
            <a href="#features" className="transition-colors hover:text-accent">Features</a>
            <a href="#how" className="transition-colors hover:text-accent">How it works</a>
            <a href="https://github.com/yagaMI-Reverse/snaplink" className="transition-colors hover:text-accent">Source</a>
          </nav>
          <Link href="/dashboard" className="btn-ghost !px-4 !py-2">
            <BarChart3 className="h-4 w-4" aria-hidden /> Dashboard
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container-page py-16 text-center lg:py-24">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface px-3.5 py-1.5 font-mono text-xs text-accent animate-fade-up">
          <Server className="h-3.5 w-3.5" aria-hidden /> Next.js + Prisma + PostgreSQL
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl animate-fade-up">
          Short links with <span className="text-accent">real analytics</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-dim animate-fade-up">
          Shorten any URL in a click — then see exactly who opened it: clicks over time, top countries, devices and referrers.
        </p>
        <div className="mt-8 flex justify-center animate-fade-up">
          <ShortenBox />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y border-line-soft bg-surface/40 py-16">
        <div className="container-page">
          <h2 className="text-center text-3xl font-bold">Everything you'd expect — and the data</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Zap, title: "Instant shortening", text: "Clean, unambiguous 6-character slugs generated on the fly — no ambiguous 0/O or 1/l." },
              { icon: MousePointerClick, title: "Click tracking", text: "Every visit is logged as an individual event, so your analytics are exact — not estimated." },
              { icon: BarChart3, title: "Clicks over time", text: "A 14-day trend line shows when your links get traffic, at a glance." },
              { icon: Globe2, title: "Geo & device", text: "See top countries, and the split across desktop, mobile and tablet." },
              { icon: Link2, title: "Referrers", text: "Know where clicks come from — which sites and platforms send you traffic." },
              { icon: ShieldCheck, title: "Reliable redirects", text: "Analytics never block the redirect: if logging fails, the visitor still lands instantly." },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <f.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="container-page py-16">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
          {[
            { n: "01", t: "Paste & shorten", d: "Drop in any URL and get a short link instantly, stored in PostgreSQL via Prisma." },
            { n: "02", t: "Share it", d: "Send the short link anywhere. Each open hits a redirect route that logs the click." },
            { n: "03", t: "Watch the data", d: "The dashboard aggregates click events into trends, geo, devices and referrers." },
          ].map((s) => (
            <div key={s.n} className="card p-6">
              <div className="font-mono text-2xl font-bold text-accent">{s.n}</div>
              <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/dashboard" className="btn-accent">
            <BarChart3 className="h-4 w-4" aria-hidden /> Open the live dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line-soft py-10">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-sm text-ink-faint sm:flex-row">
          <span className="flex items-center gap-2 font-mono text-ink">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-bg">
              <Link2 className="h-3 w-3" aria-hidden />
            </span>
            snaplink
          </span>
          <span className="font-mono text-xs">Portfolio project · Next.js 14 · Prisma · PostgreSQL</span>
        </div>
      </footer>
    </main>
  );
}
