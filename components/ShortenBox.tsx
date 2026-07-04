"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Copy, Link2, Loader2 } from "lucide-react";

type Result = { slug: string; url: string; short: string };

export default function ShortenBox() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.short);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" aria-hidden />
          <label htmlFor="url" className="sr-only">URL to shorten</label>
          <input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a long URL…"
            inputMode="url"
            className="input-mono pl-9"
          />
        </div>
        <button type="submit" disabled={busy} className="btn-accent shrink-0">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4" aria-hidden />}
          Shorten
        </button>
      </form>

      {error && <p role="alert" className="mt-2 text-sm font-medium text-red-400">{error}</p>}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mt-4 flex items-center justify-between gap-3 border-accent/30 p-3"
        >
          <a
            href={result.short}
            target="_blank"
            rel="noreferrer"
            className="truncate font-mono text-sm text-accent hover:underline"
          >
            {result.short.replace(/^https?:\/\//, "")}
          </a>
          <button onClick={copy} className="btn-ghost shrink-0 !px-3 !py-2" aria-label="Copy short link">
            {copied ? <Check className="h-4 w-4 text-accent" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
            {copied ? "Copied" : "Copy"}
          </button>
        </motion.div>
      )}
      <p className="mt-2 font-mono text-xs text-ink-faint">
        Open your short link a few times, then check the <a href="/dashboard" className="text-accent hover:underline">dashboard</a> — every click is tracked.
      </p>
    </div>
  );
}
