import { WifiOff } from "lucide-react";

export const metadata = { title: "Offline — Snaplink" };

/** Designed offline fallback served by the service worker when a navigation
 *  fails. Static by nature — everything it needs ships in the app shell. */
export default function OfflinePage() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="glass max-w-md rounded-2xl p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
          <WifiOff className="h-7 w-7 text-fuchsia-300" aria-hidden />
        </div>
        <h1 className="mt-5 text-2xl font-bold">You&apos;re offline</h1>
        <p className="mt-2 text-sm text-white/60">
          Snaplink needs a connection to shorten links and load live analytics. Your dashboard will
          be right here when you&apos;re back online.
        </p>
        <a href="/" className="gradient-border mt-6 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold">
          Try again
        </a>
      </div>
    </main>
  );
}
