"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  value,
  duration = 1100,
}: {
  value: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current && display === value) return;
    started.current = true;
    const from = display;
    const delta = value - from;
    if (delta === 0) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + delta * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return <span className="tabular-nums">{display.toLocaleString("en-US")}</span>;
}
