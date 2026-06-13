import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Upload, FileText, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DecisionX — Decision Intake" },
      { name: "description", content: "Upload a proposal and DecisionX extracts the living signals inside it." },
      { property: "og:title", content: "DecisionX — Decision Intake" },
      { property: "og:description", content: "What future are we evaluating today?" },
    ],
  }),
  component: Intake,
});

const INSIGHTS = [
  { label: "Budget", value: "€ 184M", tone: "amber", x: 14, y: 22 },
  { label: "Location", value: "District 7 · Riverside", tone: "sage", x: 78, y: 16 },
  { label: "Stakeholders", value: "12 agencies · 4 unions", tone: "terracotta", x: 8, y: 70 },
  { label: "Environmental", value: "Floodplain risk +18%", tone: "sage", x: 82, y: 62 },
  { label: "Economic", value: "GDP impact +0.6%", tone: "amber", x: 32, y: 86 },
  { label: "Political", value: "Sensitivity: elevated", tone: "terracotta", x: 62, y: 84 },
] as const;

function Intake() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "ready">("idle");
  const [proposal, setProposal] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const ingest = () => {
    setPhase("scanning");
    timer.current = window.setTimeout(() => setPhase("ready"), 1900);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-32">
      <header className="animate-rise mx-auto max-w-3xl pt-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Decision Intake · Session 0428</p>
        <h1 className="mt-4 text-5xl font-display leading-[1.05] sm:text-6xl">
          What future are we<br />
          <span className="italic text-[var(--forest)]">evaluating today?</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground">
          Drop a proposal, paste a policy brief, or import a document. DecisionX will surface
          the signals — budgets, stakeholders, exposures — before you commit a single euro.
        </p>
      </header>

      {/* Canvas */}
      <div className="animate-rise relative mt-12" style={{ animationDelay: ".1s" }}>
        <div className="glass-strong shadow-float relative mx-auto overflow-hidden rounded-[28px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr]">
            {/* Left: proposal canvas */}
            <div className="relative p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3.5 w-3.5" />
                  proposal.canvas
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" />
                  signal channel open
                </div>
              </div>

              <textarea
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                placeholder={"Riverside Mobility Corridor — A proposal to convert the eastern arterial into a multi-modal corridor with elevated transit, restored wetlands, and 3,200 mixed-income units…"}
                className="mt-5 h-72 w-full resize-none rounded-2xl border bg-[var(--surface)] p-5 font-display text-[19px] leading-[1.5] tracking-tight outline-none placeholder:text-muted-foreground/60 focus:border-[var(--amber)]"
              />

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <label className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed px-4 py-2 text-xs text-muted-foreground hover:border-[var(--forest)] hover:text-foreground">
                  <Upload className="h-3.5 w-3.5" />
                  Upload PDF
                  <input type="file" hidden onChange={() => ingest()} />
                </label>
                <button onClick={ingest} className="inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-2 text-xs text-[var(--primary-foreground)]">
                  <Sparkles className="h-3.5 w-3.5" /> Extract signals
                </button>
                {phase === "ready" && (
                  <Link to="/pulse" className="inline-flex items-center gap-1 rounded-full bg-[var(--amber)] px-5 py-2 text-xs text-[var(--foreground)]">
                    Open Decision Pulse <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>

              <div className="mt-6 flex items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>Confidence ingestion</span>
                <div className="relative h-px flex-1 bg-border">
                  <div
                    className="absolute inset-y-0 left-0 bg-[var(--forest)] transition-[width] duration-[1800ms] ease-out"
                    style={{ width: phase === "idle" ? "8%" : phase === "scanning" ? "62%" : "94%" }}
                  />
                </div>
                <span>{phase === "ready" ? "94%" : phase === "scanning" ? "scanning" : "idle"}</span>
              </div>
            </div>

            {/* Right: scan field */}
            <div className="relative min-h-[520px] border-t lg:border-l lg:border-t-0">
              <ScanField phase={phase} />
            </div>
          </div>
        </div>

        {/* Floating meta strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ["Documents", "1 ingested"],
            ["Entities detected", phase === "ready" ? "47" : "—"],
            ["Risk vectors", phase === "ready" ? "9" : "—"],
            ["Time to brief", "≈ 3 min"],
          ].map(([k, v]) => (
            <div key={k} className="glass rounded-2xl px-4 py-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</div>
              <div className="mt-1 font-display text-lg">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScanField({ phase }: { phase: "idle" | "scanning" | "ready" }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* topography */}
      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 520" preserveAspectRatio="none">
        <defs>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="520" fill="url(#halo)" />
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse key={i} cx="200" cy="260" rx={40 + i * 22} ry={26 + i * 14} fill="none" stroke="var(--forest)" strokeOpacity={0.06} />
        ))}
      </svg>

      {/* scan sweep */}
      {phase === "scanning" && (
        <div className="absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--amber)_22%,transparent)] to-transparent"
               style={{ animation: "dx-rise 1.9s ease-out both" }} />
        </div>
      )}

      {/* nodes */}
      {INSIGHTS.map((n, i) => {
        const visible = phase === "ready";
        const color = n.tone === "amber" ? "var(--amber)" : n.tone === "sage" ? "var(--sage)" : "var(--terracotta)";
        return (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              opacity: visible ? 1 : 0,
              transform: `translate(-50%,-50%) scale(${visible ? 1 : 0.7})`,
              transitionDelay: `${i * 110}ms`,
            }}
          >
            <div className="relative">
              <span className="absolute inset-0 -m-3 rounded-full" style={{ background: color, opacity: 0.18, filter: "blur(8px)" }} />
              <div className="glass-strong relative flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3">
                <span className="h-3 w-3 rounded-full" style={{ background: color }} />
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{n.label}</div>
                  <div className="text-xs font-medium">{n.value}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* connecting lines */}
      {phase === "ready" && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {INSIGHTS.map((n, i) => (
            <line
              key={i}
              x1="50%" y1="50%"
              x2={`${n.x}%`} y2={`${n.y}%`}
              stroke="var(--forest)" strokeOpacity="0.18"
              strokeDasharray="2 5"
            />
          ))}
        </svg>
      )}

      {/* core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-pulse-slow rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, var(--amber), var(--terracotta) 60%, var(--forest))" }} />
          <div className="absolute inset-2 rounded-full bg-[var(--surface)]/70 backdrop-blur" />
          <div className="absolute inset-0 grid place-items-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">core</div>
        </div>
      </div>
    </div>
  );
}
