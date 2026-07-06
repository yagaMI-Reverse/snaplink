"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardPaste,
  Copy,
  Link2,
  Loader2,
  Sparkles,
} from "lucide-react";

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

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      /* clipboard denied — user can type */
    }
  };

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.short);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="w-full max-w-2xl">
      {/* command bar */}
      <form onSubmit={submit}>
        <div className="card flex flex-col gap-2 p-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Link2
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              aria-hidden
            />
            <label htmlFor="url" className="sr-only">
              URL to shorten
            </label>
            <input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a long URL…"
              inputMode="url"
              className="w-full rounded-xl border-0 bg-transparent py-3.5 pl-11 pr-24 font-mono text-sm text-ink placeholder:text-ink-faint focus:outline-none"
            />
            <button
              type="button"
              onClick={paste}
              className="absolute right-2 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-semibold text-ink-dim transition-all duration-200 hover:border-violet/50 hover:text-accent"
            >
              <ClipboardPaste className="h-3.5 w-3.5" aria-hidden />
              Paste
            </button>
          </div>
          <button type="submit" disabled={busy} className="btn-accent shrink-0 sm:!px-7">
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <Sparkles className="h-4 w-4" aria-hidden />
            )}
            Shorten
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-sm font-medium text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="gradient-border mt-5"
          >
            <div className="flex flex-col items-stretch gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                  Your short link
                </p>
                <a
                  href={result.short}
                  target="_blank"
                  rel="noreferrer"
                  className="gradient-text block truncate font-mono text-lg font-bold"
                >
                  {result.short.replace(/^https?:\/\//, "")}
                </a>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={copy}
                  className="btn-ghost !px-4 !py-2.5"
                  aria-label="Copy short link"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-1.5 text-cyan"
                      >
                        <Check className="h-4 w-4" aria-hidden /> Copied
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-1.5"
                      >
                        <Copy className="h-4 w-4" aria-hidden /> Copy
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <a href="/dashboard" className="btn-ghost !px-4 !py-2.5">
                  <BarChart3 className="h-4 w-4" aria-hidden /> Track it
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-3 text-center font-mono text-xs text-ink-faint">
        Open your short link a few times, then watch the{" "}
        <a href="/dashboard" className="text-accent underline-offset-2 hover:underline">
          live dashboard
        </a>{" "}
        — every click becomes a data point.
      </p>
    </div>
  );
}
