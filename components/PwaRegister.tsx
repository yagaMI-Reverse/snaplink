"use client";

import { useEffect } from "react";

/** Registers the service worker once on load (production only — a dev SW
 *  would cache hot-reload chunks and confuse everyone). */
export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  return null;
}
