import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/ripple")({
  head: () => ({
    meta: [
      { title: "DecisionX — Future Ripple Map" },
      { name: "description", content: "A living network of consequences radiating from a single decision." },
      { property: "og:title", content: "DecisionX — Future Ripple Map" },
      { property: "og:description", content: "Explore the consequences of a decision as a living map." },
    ],
  }),
  component: Ripple,
});

type Node = {
  id: string; label: string; tier: 0 | 1 | 2;
  parent?: string; tone: "amber" | "sage" | "terracotta" | "forest";
  story: string; delta: string;
};

const NODES: Node[] = [
  { id: "root", label: "Riverside Mobility Corridor", tier: 0, tone: "forest", story: "Multi-modal corridor with elevated transit, wetland restoration and mixed-income housing.", delta: "" },

  { id: "traffic", label: "Traffic", tier: 1, parent: "root", tone: "amber", story: "Average commute time falls 14% in adjacent districts.", delta: "−14%" },
  { id: "employment", label: "Employment", tier: 1, parent: "root", tone: "sage", story: "43k sustained jobs across construction and services.", delta: "+43k" },
  { id: "property", label: "Property Value", tier: 1, parent: "root", tone: "amber", story: "Property uplift of €1.4B with displacement risk along eastern edge.", delta: "+€1.4B" },
  { id: "pollution", label: "Pollution", tier: 1, parent: "root", tone: "sage", story: "PM2.5 down 22% in corridor; aquifer risk in Phase 2.", delta: "−22%" },
  { id: "crime", label: "Crime", tier: 1, parent: "root", tone: "terracotta", story: "Property crime −9% near transit hubs; displacement-linked spikes in periphery.", delta: "−9%" },
  { id: "sentiment", label: "Public Sentiment", tier: 1, parent: "root", tone: "amber", story: "61% favourable, conditional on affordability guarantees.", delta: "+61" },
  { id: "business", label: "Business Growth", tier: 1, parent: "root", tone: "sage", story: "Small-business formation +18% within a 1km band.", delta: "+18%" },
  { id: "education", label: "Education Access", tier: 1, parent: "root", tone: "amber", story: "+12% students within 30-min reach of a STEM school.", delta: "+12%" },
  { id: "health", label: "Health Outcomes", tier: 1, parent: "root", tone: "sage", story: "Respiratory ER visits projected to drop 7% by year 4.", delta: "−7%" },

  { id: "displace", label: "Displacement", tier: 2, parent: "property", tone: "terracotta", story: "240 households at risk without binding protection clauses.", delta: "240 hh" },
  { id: "aquifer", label: "Aquifer Risk", tier: 2, parent: "pollution", tone: "terracotta", story: "Phase 2 dredging exposes shallow aquifer if not redesigned.", delta: "elevated" },
  { id: "wages", label: "Wage Growth", tier: 2, parent: "employment", tone: "sage", story: "Median wages in corridor rise 3.4% above inflation.", delta: "+3.4%" },
  { id: "transit", label: "Transit Equity", tier: 2, parent: "traffic", tone: "amber", story: "Underserved neighbourhoods gain 22% more reachable jobs.", delta: "+22%" },
];

function Ripple() {
  const [selected, setSelected] = useState<string>("root");
  const node = NODES.find((n) => n.id === selected)!;

  // Layout: root center, tier 1 ring, tier 2 child of tier 1
  const positioned = useMemo(() => {
    const tier1 = NODES.filter((n) => n.tier === 1);
    const cx = 500, cy = 420;
    const r1 = 260;
    const positions: Record<string, { x: number; y: number }> = { root: { x: cx, y: cy } };
    tier1.forEach((n, i) => {
      const a = (i / tier1.length) * Math.PI * 2 - Math.PI / 2;
      positions[n.id] = { x: cx + Math.cos(a) * r1, y: cy + Math.sin(a) * r1 };
    });
    NODES.filter((n) => n.tier === 2).forEach((n) => {
      const p = positions[n.parent!];
      const root = positions.root;
      const dx = p.x - root.x, dy = p.y - root.y;
      const len = Math.hypot(dx, dy);
      positions[n.id] = { x: p.x + (dx / len) * 120, y: p.y + (dy / len) * 120 };
    });
    return positions;
  }, []);

  const toneColor = (t: Node["tone"]) =>
    t === "amber" ? "var(--amber)" : t === "sage" ? "var(--sage)" : t === "terracotta" ? "var(--terracotta)" : "var(--forest)";

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-32">
      <header className="animate-rise mx-auto max-w-3xl pt-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Future Ripple Map · 7-year horizon</p>
        <h1 className="mt-4 text-5xl font-display leading-[1.05] sm:text-6xl">
          One decision. <span className="italic">A thousand consequences.</span>
        </h1>
      </header>

      <div className="animate-rise mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]" style={{ animationDelay: ".08s" }}>
        <div className="glass-strong shadow-float relative overflow-hidden rounded-[28px]">
          <svg viewBox="0 0 1000 840" className="h-[640px] w-full">
            <defs>
              <radialGradient id="rippleHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={500} cy={420} r={360} fill="url(#rippleHalo)" />
            {[120, 200, 280, 360].map((r) => (
              <circle key={r} cx={500} cy={420} r={r} fill="none" stroke="var(--forest)" strokeOpacity={0.06} />
            ))}

            {/* edges */}
            {NODES.filter((n) => n.parent).map((n) => {
              const a = positioned[n.parent!];
              const b = positioned[n.id];
              const active = selected === n.id || selected === n.parent;
              return (
                <line key={`e-${n.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke={toneColor(n.tone)} strokeOpacity={active ? 0.7 : 0.22}
                      strokeWidth={active ? 1.4 : 1}
                      className={active ? "animate-dash" : ""} />
              );
            })}

            {/* nodes */}
            {NODES.map((n) => {
              const p = positioned[n.id];
              const active = selected === n.id;
              const r = n.tier === 0 ? 48 : n.tier === 1 ? 30 : 20;
              const c = toneColor(n.tone);
              return (
                <g key={n.id} style={{ cursor: "pointer" }} onClick={() => setSelected(n.id)}>
                  {active && <circle cx={p.x} cy={p.y} r={r + 18} fill="none" stroke={c} strokeOpacity={0.35} className="animate-pulse-slow" />}
                  <circle cx={p.x} cy={p.y} r={r} fill="var(--surface)" stroke={c} strokeWidth={active ? 2 : 1} strokeOpacity={active ? 1 : 0.5} />
                  <circle cx={p.x} cy={p.y} r={r * 0.4} fill={c} fillOpacity={0.85} />
                  <text x={p.x} y={p.y + r + 16} textAnchor="middle" fontSize={n.tier === 0 ? 13 : 11}
                        fill="var(--foreground)" fontFamily="Sora, sans-serif">{n.label}</text>
                  {n.delta && (
                    <text x={p.x} y={p.y + r + 30} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">{n.delta}</text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute left-4 top-4 flex gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="glass rounded-full px-2.5 py-1">scroll to zoom · click a node</span>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="glass-strong shadow-soft rounded-[24px] p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Selected consequence</div>
            <div className="mt-1 font-display text-2xl leading-tight">{node.label}</div>
            <div className="mt-2 text-xs text-muted-foreground">Tier {node.tier} · {node.delta || "origin"}</div>
            <p className="mt-4 font-display text-[18px] leading-snug text-foreground/90">{node.story}</p>
          </div>

          <div className="glass rounded-2xl p-5 text-xs">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Adjacent ripples</div>
            <ul className="mt-2 space-y-1.5">
              {NODES.filter((n) => n.parent === node.id || n.id === node.parent).map((n) => (
                <li key={n.id}>
                  <button onClick={() => setSelected(n.id)} className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[var(--surface-soft)]">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: toneColor(n.tone) }} />{n.label}</span>
                    <span className="text-muted-foreground">{n.delta || "—"}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/briefing" className="inline-flex items-center justify-between rounded-full bg-[var(--forest)] px-5 py-3 text-xs text-[var(--primary-foreground)]">
            Generate executive briefing <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
