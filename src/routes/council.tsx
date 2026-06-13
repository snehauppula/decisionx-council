import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/council")({
  head: () => ({
    meta: [
      { title: "DecisionX — AI Council" },
      { name: "description", content: "A circular chamber where five AI advisors debate the decision." },
      { property: "og:title", content: "DecisionX — AI Council" },
      { property: "og:description", content: "Live policy debate between five AI personas." },
    ],
  }),
  component: Council,
});

type Member = {
  id: string;
  role: string;
  name: string;
  glyph: string;
  color: string;
  confidence: number;
  stance: "for" | "mitigate" | "against";
  opinion: string;
  risks: string[];
  opportunities: string[];
};

const COUNCIL: Member[] = [
  {
    id: "econ", role: "Economist", name: "Dr. Halden", glyph: "Æ", color: "var(--amber)",
    confidence: 78, stance: "for",
    opinion: "Multiplier effect of 1.8× on regional GDP within seven years. Wage growth in adjacent districts exceeds inflation.",
    risks: ["Bond market sensitivity", "Construction cost overruns (12–18%)"],
    opportunities: ["43,000 sustained jobs", "Property uplift €1.4B"],
  },
  {
    id: "urban", role: "Urban Planner", name: "Arq. Mireles", glyph: "◐", color: "var(--forest)",
    confidence: 84, stance: "for",
    opinion: "Corridor knits two severed districts. Modal split shifts away from private vehicles by 22%.",
    risks: ["Displacement of 240 households without protection clauses"],
    opportunities: ["Walkability +38%", "Heat island reduction"],
  },
  {
    id: "env", role: "Environmental Scientist", name: "Dr. Okafor", glyph: "❋", color: "var(--sage)",
    confidence: 52, stance: "mitigate",
    opinion: "Wetland restoration is a net positive — but Phase 2 dredging risks aquifer contamination if not redesigned.",
    risks: ["Aquifer exposure", "Migratory corridor disruption"],
    opportunities: ["Carbon sink: 14kt/yr", "Flood resilience +30%"],
  },
  {
    id: "citizen", role: "Citizen Representative", name: "M. Volkov", glyph: "▲", color: "var(--terracotta)",
    confidence: 61, stance: "mitigate",
    opinion: "Sentiment is cautiously positive but residents demand binding affordability guarantees and a community trust.",
    risks: ["Trust erosion if guarantees slip"],
    opportunities: ["Community ownership stake", "Lower commute times"],
  },
  {
    id: "gov", role: "Government Advisor", name: "Ch. Adachi", glyph: "✦", color: "var(--amber)",
    confidence: 69, stance: "for",
    opinion: "Politically viable across both chambers if environmental safeguards are codified before Q3 vote.",
    risks: ["Opposition leverage if Phase 2 leaks"],
    opportunities: ["Bipartisan signature legacy project"],
  },
];

function Council() {
  const [activeId, setActiveId] = useState<string>("urban");
  const active = COUNCIL.find((m) => m.id === activeId)!;

  const consensus = Math.round(COUNCIL.reduce((s, m) => s + m.confidence, 0) / COUNCIL.length);
  const stances = COUNCIL.reduce(
    (acc, m) => ((acc[m.stance] = (acc[m.stance] || 0) + 1), acc),
    {} as Record<string, number>
  );

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-32">
      <header className="animate-rise mx-auto max-w-3xl pt-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">AI Council · Session in progress</p>
        <h1 className="mt-4 text-5xl font-display leading-[1.05] sm:text-6xl">
          Five minds. <span className="italic">One decision.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          A chamber of specialised advisors converges on a consensus in real time. Tap a chair to hear their argument.
        </p>
      </header>

      <div className="animate-rise mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_.95fr]" style={{ animationDelay: ".08s" }}>
        {/* Chamber */}
        <div className="glass-strong shadow-float relative aspect-square overflow-hidden rounded-[28px]">
          <CouncilTable members={COUNCIL} activeId={activeId} onSelect={setActiveId} consensus={consensus} />
        </div>

        {/* Active speaker + consensus */}
        <div className="flex flex-col gap-4">
          <div className="glass-strong shadow-soft rounded-[24px] p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Now speaking</div>
                <div className="mt-1 font-display text-2xl leading-tight">{active.name}</div>
                <div className="text-xs text-muted-foreground">{active.role}</div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl text-2xl font-display"
                   style={{ background: `color-mix(in oklab, ${active.color} 18%, transparent)`, color: active.color }}>
                {active.glyph}
              </div>
            </div>

            <p className="mt-4 font-display text-[19px] leading-snug text-foreground/90">
              "{active.opinion}"
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Risks</div>
                <ul className="mt-2 space-y-1.5">
                  {active.risks.map((r) => (
                    <li key={r} className="flex gap-2"><span className="mt-1 h-1 w-1 rounded-full bg-[var(--terracotta)]" />{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Opportunities</div>
                <ul className="mt-2 space-y-1.5">
                  {active.opportunities.map((r) => (
                    <li key={r} className="flex gap-2"><span className="mt-1 h-1 w-1 rounded-full bg-[var(--sage)]" />{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Confidence</span>
              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                <div className="h-full rounded-full" style={{ width: `${active.confidence}%`, background: active.color }} />
              </div>
              <span className="font-display tabular-nums">{active.confidence}</span>
            </div>
          </div>

          <div className="glass rounded-[24px] p-6">
            <div className="flex items-baseline justify-between">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Consensus Engine</div>
              <div className="font-display text-4xl tabular-nums">{consensus}<span className="text-base text-muted-foreground">/100</span></div>
            </div>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full">
              <div style={{ width: `${(stances.for || 0) * 20}%`, background: "var(--sage)" }} />
              <div style={{ width: `${(stances.mitigate || 0) * 20}%`, background: "var(--amber)" }} />
              <div style={{ width: `${(stances.against || 0) * 20}%`, background: "var(--terracotta)" }} />
            </div>
            <div className="mt-3 flex justify-between text-[11px] text-muted-foreground">
              <span>{stances.for || 0} proceed</span>
              <span>{stances.mitigate || 0} mitigate</span>
              <span>{stances.against || 0} oppose</span>
            </div>
          </div>

          <Link to="/ripple" className="inline-flex items-center justify-between rounded-full bg-[var(--forest)] px-5 py-3 text-xs text-[var(--primary-foreground)]">
            Trace the consequences <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CouncilTable({
  members, activeId, onSelect, consensus,
}: { members: Member[]; activeId: string; onSelect: (id: string) => void; consensus: number }) {
  const size = 720;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 240;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      <defs>
        <radialGradient id="table" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.25" />
          <stop offset="70%" stopColor="var(--forest)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--forest)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* concentric rings */}
      {[120, 170, 220].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="var(--forest)" strokeOpacity={0.08} />
      ))}

      {/* aurora plate */}
      <circle cx={cx} cy={cy} r={150} fill="url(#table)" />

      {/* rotating filaments */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, animation: "dx-orbit 90s linear infinite" }}>
        <circle cx={cx} cy={cy} r={110} fill="none" stroke="var(--amber)" strokeOpacity={0.35} strokeDasharray="2 12" />
      </g>

      {/* connectors center -> members */}
      {members.map((m, i) => {
        const angle = (i / members.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        return (
          <line key={`l-${m.id}`} x1={cx} y1={cy} x2={x} y2={y}
                stroke={m.color} strokeOpacity={activeId === m.id ? 0.6 : 0.18}
                strokeDasharray="3 6" />
        );
      })}

      {/* central consensus */}
      <g>
        <circle cx={cx} cy={cy} r={70} fill="var(--surface)" stroke="var(--forest)" strokeOpacity={0.1} />
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)" letterSpacing="2">CONSENSUS</text>
        <text x={cx} y={cy + 22} textAnchor="middle" fontSize="34" fontFamily="Sora, sans-serif" fontWeight="500">{consensus}</text>
      </g>

      {/* members */}
      {members.map((m, i) => {
        const angle = (i / members.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        const active = m.id === activeId;
        return (
          <g key={m.id} style={{ cursor: "pointer" }} onClick={() => onSelect(m.id)}>
            <circle cx={x} cy={y} r={active ? 56 : 46} fill="var(--surface)" stroke={m.color} strokeOpacity={active ? 0.9 : 0.35} strokeWidth={active ? 2 : 1} />
            {active && <circle cx={x} cy={y} r={70} fill="none" stroke={m.color} strokeOpacity={0.35} className="animate-pulse-slow" />}
            <text x={x} y={y + 4} textAnchor="middle" fontSize="22" fontFamily="Sora, sans-serif" fill={m.color}>{m.glyph}</text>
            <text x={x} y={y + (Math.sin(angle) > 0 ? 90 : -70)} textAnchor="middle" fontSize="11" fill="var(--foreground)" fontFamily="Sora, sans-serif">
              {m.role}
            </text>
            <text x={x} y={y + (Math.sin(angle) > 0 ? 105 : -55)} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
              confidence {m.confidence}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
