import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Download, Languages, Pause } from "lucide-react";

export const Route = createFileRoute("/briefing")({
  head: () => ({
    meta: [
      { title: "DecisionX — Executive Briefing" },
      { name: "description", content: "A cinematic boardroom briefing with recommendation, timeline and narrative." },
      { property: "og:title", content: "DecisionX — Executive Briefing" },
      { property: "og:description", content: "Cinematic recommendation, timeline and narrative ready for the cabinet." },
    ],
  }),
  component: Briefing,
});

const RECS = [
  { id: "proceed", label: "Proceed", tone: "var(--sage)" },
  { id: "mitigate", label: "Proceed with Mitigation", tone: "var(--amber)" },
  { id: "reconsider", label: "Reconsider", tone: "var(--terracotta)" },
] as const;

const TIMELINE = [
  { year: "Y1", risk: "Permit contention with eastern district council", op: "Federal infrastructure co-funding window" },
  { year: "Y2", risk: "Construction cost inflation 12–18%", op: "Local hiring program activates" },
  { year: "Y3", risk: "Wetland Phase 2 aquifer exposure", op: "Wetland Phase 1 yields first flood resilience gains" },
  { year: "Y4", risk: "Displacement claims peak", op: "Modal split shift visible: −14% commute" },
  { year: "Y5", risk: "Political cycle — opposition leverage", op: "Property uplift €600M materialised" },
  { year: "Y7", risk: "Maintenance funding cliff", op: "Carbon sink registered: 14kt/yr" },
];

function Briefing() {
  const [rec, setRec] = useState<(typeof RECS)[number]["id"]>("mitigate");
  const [playing, setPlaying] = useState(false);
  const active = RECS.find((r) => r.id === rec)!;

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-32">
      <header className="animate-rise mx-auto max-w-3xl pt-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Executive Briefing · Cabinet-ready</p>
        <h1 className="mt-4 text-5xl font-display leading-[1.05] sm:text-6xl">
          The recommendation, <span className="italic">narrated.</span>
        </h1>
      </header>

      {/* Cinematic stage */}
      <div className="animate-rise glass-strong shadow-float relative mt-10 overflow-hidden rounded-[32px]" style={{ animationDelay: ".08s" }}>
        <div className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--amber) 18%, transparent), transparent 60%), radial-gradient(40% 40% at 80% 100%, color-mix(in oklab, var(--sage) 18%, transparent), transparent 60%)"
        }} />

        <div className="relative grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_.9fr]">
          {/* Recommendation */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Recommendation</div>
            <h2 className="mt-3 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl">
              <span style={{ color: active.tone }}>{active.label}.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-foreground/85">
              DecisionX recommends proceeding with the Riverside Mobility Corridor on the condition
              that <span className="font-medium">three mitigations</span> are codified before the Q3 vote:
              binding affordability clauses, Phase 2 aquifer redesign, and a community ownership trust.
              Under these conditions, projected confidence rises from 82 to <span className="font-medium">91</span>.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {RECS.map((r) => (
                <button key={r.id} onClick={() => setRec(r.id)}
                  className={"rounded-full border px-4 py-2 text-xs transition-colors " +
                    (r.id === rec ? "border-transparent text-[var(--background)]" : "border-border text-foreground hover:bg-[var(--surface-soft)]")}
                  style={r.id === rec ? { background: r.tone } : undefined}>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Player */}
            <div className="glass mt-8 flex items-center gap-4 rounded-2xl p-3 pl-4">
              <button onClick={() => setPlaying((p) => !p)}
                className="grid h-10 w-10 place-items-center rounded-full bg-[var(--forest)] text-[var(--primary-foreground)]">
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <div className="text-[11px] text-muted-foreground">Narrated briefing · Voice: Halden</div>
                <div className="relative mt-1 h-1 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                  <div className="absolute inset-y-0 left-0 bg-[var(--amber)]"
                       style={{ width: playing ? "62%" : "8%", transition: "width 12s linear" }} />
                </div>
              </div>
              <button className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px]">
                <Languages className="h-3.5 w-3.5" /> EN · ES · AR · FR
              </button>
              <button className="flex items-center gap-1.5 rounded-full bg-[var(--surface-soft)] px-3 py-1.5 text-[11px]">
                <Download className="h-3.5 w-3.5" /> Export PDF
              </button>
            </div>
          </div>

          {/* Scorecard */}
          <div className="glass-strong relative overflow-hidden rounded-[24px] p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Briefing scorecard</div>
            <div className="mt-3 flex items-baseline gap-3">
              <div className="font-display text-7xl tabular-nums">91</div>
              <div className="text-xs text-[var(--sage)]">post-mitigation confidence</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {[
                ["Economic", "+€1.4B", "var(--amber)"],
                ["Environmental", "Net positive", "var(--sage)"],
                ["Political", "Bipartisan", "var(--forest)"],
                ["Citizen", "61% favour", "var(--terracotta)"],
              ].map(([k, v, c]) => (
                <div key={k} className="rounded-xl border p-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: c as string }} />{k}
                  </div>
                  <div className="mt-1 font-display text-base">{v}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              The recommendation reflects the AI Council consensus, the Pulse trajectory and the second-order
              ripples surfaced over a 7-year horizon.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative border-t px-8 py-10 sm:px-12">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-2xl">Risk & opportunity timeline</h3>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">7-year horizon</span>
          </div>

          <div className="relative mt-8">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
            <div className="grid grid-cols-6 gap-3">
              {TIMELINE.map((t, i) => (
                <div key={t.year} className="relative">
                  <div className="mb-4 rounded-xl bg-[var(--surface)] p-3 text-[11px] shadow-soft">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--terracotta)]">Risk</div>
                    <div className="mt-1 leading-snug text-foreground/85">{t.risk}</div>
                  </div>
                  <div className="relative grid place-items-center">
                    <div className="h-3 w-3 rounded-full bg-[var(--forest)]" />
                    <div className="mt-1 font-display text-xs text-muted-foreground">{t.year}</div>
                  </div>
                  <div className="mt-4 rounded-xl bg-[var(--surface)] p-3 text-[11px] shadow-soft">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--sage)]">Opportunity</div>
                    <div className="mt-1 leading-snug text-foreground/85">{t.op}</div>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
