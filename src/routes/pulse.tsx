import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pulse")({
  head: () => ({
    meta: [
      { title: "DecisionX — Decision Pulse" },
      { name: "description", content: "Observe the living intelligence sphere for this decision." },
      { property: "og:title", content: "DecisionX — Decision Pulse" },
      { property: "og:description", content: "A planetary system of impacts orbiting one decision." },
    ],
  }),
  component: Pulse,
});

const RINGS = [
  { label: "Economic Impact", value: 78, color: "var(--amber)", r: 150 },
  { label: "Social Impact", value: 66, color: "var(--sage)", r: 190 },
  { label: "Environmental Impact", value: 41, color: "var(--terracotta)", r: 230 },
  { label: "Political Risk", value: 54, color: "var(--forest)", r: 270 },
  { label: "Citizen Support", value: 71, color: "var(--amber)", r: 310 },
] as const;

function Pulse() {
  const C = 380;
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-32">
      <header className="animate-rise mx-auto max-w-3xl pt-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Decision Pulse · Riverside Mobility Corridor</p>
        <h1 className="mt-4 text-5xl font-display leading-[1.05] sm:text-6xl">
          A planetary system of <span className="italic">consequence.</span>
        </h1>
      </header>

      <div className="animate-rise mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]" style={{ animationDelay: ".08s" }}>
        {/* Sphere */}
        <div className="glass-strong shadow-float relative aspect-square overflow-hidden rounded-[28px]">
          <svg viewBox={`0 0 ${C * 2} ${C * 2}`} className="h-full w-full">
            <defs>
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.9" />
                <stop offset="60%" stopColor="var(--terracotta)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--forest)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* halo */}
            <circle cx={C} cy={C} r={130} fill="url(#core)" />

            {/* faint background grid */}
            {Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx={C} cy={C} r={80 + i * 50} fill="none" stroke="var(--forest)" strokeOpacity={0.05} />
            ))}

            {/* rings */}
            {RINGS.map((ring, i) => {
              const circumference = 2 * Math.PI * ring.r;
              const arc = (ring.value / 100) * circumference;
              return (
                <g key={ring.label} style={{ transformOrigin: `${C}px ${C}px`, animation: `dx-orbit ${60 + i * 20}s linear infinite ${i % 2 ? "reverse" : ""}` }}>
                  <circle cx={C} cy={C} r={ring.r} fill="none" stroke="var(--forest)" strokeOpacity={0.08} strokeWidth={1} />
                  <circle
                    cx={C} cy={C} r={ring.r}
                    fill="none" stroke={ring.color} strokeWidth={6} strokeLinecap="round"
                    strokeDasharray={`${arc} ${circumference - arc}`}
                    transform={`rotate(${-90 + i * 35} ${C} ${C})`}
                    style={{ filter: `drop-shadow(0 0 10px ${ring.color})`, opacity: 0.85 }}
                  />
                  {/* satellite */}
                  <circle
                    cx={C + ring.r} cy={C} r={6} fill={ring.color}
                    transform={`rotate(${i * 47} ${C} ${C})`}
                  />
                </g>
              );
            })}

            {/* connecting filaments */}
            {RINGS.map((ring, i) => (
              <line key={i} x1={C} y1={C} x2={C + ring.r} y2={C}
                stroke={ring.color} strokeOpacity={0.18} strokeDasharray="2 6"
                transform={`rotate(${i * 47} ${C} ${C})`} />
            ))}
          </svg>

          {/* Center confidence */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Decision Confidence</div>
              <div className="font-display text-7xl leading-none tracking-tight">82</div>
              <div className="mt-1 text-xs text-[var(--sage)]">↑ 6 from yesterday's projection</div>
            </div>
          </div>

          {/* Labels around ring */}
          <div className="absolute inset-0">
            {RINGS.map((r, i) => {
              const positions = [
                { top: "8%", left: "50%" },
                { top: "30%", right: "6%" },
                { bottom: "20%", right: "10%" },
                { bottom: "8%", left: "30%" },
                { top: "40%", left: "4%" },
              ];
              const p = positions[i];
              return (
                <div key={r.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={p as React.CSSProperties}>
                  <div className="glass rounded-full px-3 py-1.5 text-[11px]">
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ background: r.color }} />
                    {r.label} · <span className="font-medium">{r.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        <aside className="flex flex-col gap-4">
          <div className="glass shadow-soft rounded-[24px] p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Active scenario</div>
            <div className="mt-1 font-display text-lg leading-tight">Riverside Mobility Corridor — Variant B</div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Elevated transit + restored wetlands, phased over 7 years. Pulse reflects updated environmental and budget signals from this morning.
            </p>
          </div>

          {RINGS.map((r) => (
            <div key={r.label} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                  {r.label}
                </span>
                <span className="font-display tabular-nums">{r.value}</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                <div className="h-full rounded-full" style={{ width: `${r.value}%`, background: r.color }} />
              </div>
            </div>
          ))}

          <Link to="/council" className="mt-2 inline-flex items-center justify-between rounded-full bg-[var(--forest)] px-5 py-3 text-xs text-[var(--primary-foreground)]">
            Convene the AI Council <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
