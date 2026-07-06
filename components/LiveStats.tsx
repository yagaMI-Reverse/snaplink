"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Link2, MousePointerClick } from "lucide-react";
import CountUp from "./CountUp";

interface Totals {
  links: number;
  clicks: number;
  topCountry: string;
}

export default function LiveStats() {
  const [totals, setTotals] = useState<Totals | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setTotals(d.totals))
      .catch(() => setTotals(null));
  }, []);

  const items = [
    {
      icon: Link2,
      label: "links shortened",
      value: totals ? <CountUp value={totals.links} /> : "—",
      color: "text-accent",
    },
    {
      icon: MousePointerClick,
      label: "clicks tracked",
      value: totals ? <CountUp value={totals.clicks} /> : "—",
      color: "text-fuchsia",
    },
    {
      icon: Globe2,
      label: "top country",
      value: totals?.topCountry ?? "—",
      color: "text-cyan",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="card mx-auto flex w-full max-w-2xl flex-col items-stretch divide-y divide-line-soft sm:flex-row sm:divide-x sm:divide-y-0"
    >
      {items.map((it) => (
        <div key={it.label} className="flex flex-1 items-center justify-center gap-3 px-6 py-4">
          <it.icon className={`h-5 w-5 ${it.color}`} aria-hidden />
          <div className="text-left">
            <div className={`font-mono text-xl font-bold ${it.color}`}>{it.value}</div>
            <div className="text-[11px] uppercase tracking-wider text-ink-faint">{it.label}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
