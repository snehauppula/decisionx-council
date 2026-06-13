import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Upload, FileText, Sparkles, ArrowRight, Command, Globe2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DecisionX — Future Simulation Operating System" },
      { name: "description", content: "DecisionX lets governments and planners see the consequences of decisions before implementation." },
      { property: "og:title", content: "DecisionX — Future Simulation Operating System" },
      { property: "og:description", content: "Simulate the consequences of a decision before you commit." },
    ],
  }),
  component: Home,
});

const INSIGHTS = [
  { label: "Budget", value: "€ 184M", tone: "amber", x: 14, y: 22 },
  { label: "Location", value: "District 7 · Riverside", tone: "sage", x: 80, y: 14 },
  { label: "Stakeholders", value: "12 agencies · 4 unions", tone: "terracotta", x: 8, y: 70 },
  { label: "Environmental", value: "Floodplain risk +18%", tone: "sage", x: 84, y: 64 },
  { label: "Economic", value: "GDP impact +0.6%", tone: "amber", x: 30, y: 88 },
  { label: "Political", value: "Sensitivity: elevated", tone: "terracotta", x: 64, y: 84 },
] as const;

const SAMPLES = [
  "Riverside Mobility Corridor",
  "Coastal Desalination Plant",
  "Universal Pre-K Expansion",
  "Old Town Pedestrianisation",
];

const PIPELINE = [
  { to: "/", label: "Intake", caption: "Ingest the proposal" },
  { to: "/pulse", label: "Pulse", caption: "Watch the impact sphere" },
  { to: "/council", label: "Council", caption: "Convene five AI minds" },
  { to: "/ripple", label: "Ripple Map", caption: "Trace the consequences" },
  { to: "/briefing", label: "Briefing", caption: "Brief the cabinet" },
] as const;

function Home() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "ready">("idle");
  const [proposal, setProposal] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  const ingest = () => {
    setPhase("scanning");
    timer.current = window.setTimeout(() => setPhase("ready"), 1900);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-6 pt-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border bg-[var(--surface)]/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-slow rounded-full bg-[var(--amber)]" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--amber)]" />
              </span>
              Future Simulation OS · v0.4 preview
            </div>

            <h1 className="mt-6 font-display text-[56px] leading-[0.98] tracking-[-0.025em] sm:text-[76px]">
              See the future<br />
              <span className="italic text-[var(--forest)]">before you fund it.</span>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-foreground/75">
              DecisionX simulates the second- and third-order consequences of a policy
              decision — economic, environmental, social, political — so cabinets can
              act with foresight, not hope.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#intake" className="inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-3 text-sm text-[var(--primary-foreground)] shadow-soft transition hover:translate-y-[-1px]">
                <Sparkles className="h-4 w-4" /> Start a simulation
              </a>
              <Link to="/ripple" className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm text-foreground hover:bg-[var(--surface-soft)]">
                Explore a live ripple map <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["7y", "default horizon"],
                ["1,400+", "signals modelled"],
                ["5", "AI advisors at the table"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl tracking-tight">{k}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual: ambient orrery */}
          <div className="animate-rise relative" style={{ animationDelay: ".15s" }}>
            <Orrery />
          </div>
        </div>

        {/* Ambient ticker */}
        <div className="mt-14 flex items-center gap-6 overflow-hidden border-y py-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="flex items-center gap-2"><Globe2 className="h-3.5 w-3.5" /> Live signals</span>
          {[
            "Lisbon · housing pulse +3.2",
            "Helsinki · transit modal shift −1.8",
            "Bogotá · floodplain risk elevated",
            "Singapore · sentiment confidence 74",
            "Toronto · permit contention rising",
          ].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full" style={{ background: ["var(--amber)","var(--sage)","var(--terracotta)","var(--forest)","var(--amber)"][i % 5] }} />
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* PIPELINE */}
      <section className="mx-auto mt-20 max-w-7xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">The DecisionX journey</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">Five surfaces. One continuous thought.</h2>
          </div>
          <div className="hidden text-xs text-muted-foreground sm:block">Click any stage to jump in.</div>
        </div>

        <div className="relative mt-8">
          <div className="absolute left-6 right-6 top-7 hidden h-px bg-border sm:block" />
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {PIPELINE.map((p, i) => (
              <li key={p.to}>
                <Link to={p.to} className="group block">
                  <div className="glass relative flex h-14 w-14 items-center justify-center rounded-full transition-transform group-hover:-translate-y-1">
                    <span className="font-display text-sm tabular-nums">0{i + 1}</span>
                    {i === 0 && <span className="absolute inset-0 rounded-full ring-2 ring-[var(--amber)]" />}
                  </div>
                  <div className="mt-4 font-display text-base tracking-tight">{p.label}</div>
                  <div className="text-xs text-muted-foreground">{p.caption}</div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* INTAKE */}
      <section id="intake" className="relative mx-auto mt-24 max-w-7xl px-6 pb-32 scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Decision Intake · Session 0428</p>
          <h2 className="mt-4 font-display text-5xl leading-[1.05] tracking-[-0.02em] sm:text-6xl">
            What future are we<br />
            <span className="italic text-[var(--forest)]">evaluating today?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-muted-foreground">
            Drop a proposal, paste a policy brief, or import a document. DecisionX surfaces the signals
            — budgets, stakeholders, exposures — before you commit a single euro.
          </p>
        </div>

        <div className="animate-rise relative mt-12">
          <div className="glass-strong shadow-float relative mx-auto overflow-hidden rounded-[28px]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr]">
              <div className="relative p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" /> proposal.canvas
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" /> signal channel open
                  </div>
                </div>

                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  placeholder={"Riverside Mobility Corridor — A proposal to convert the eastern arterial into a multi-modal corridor with elevated transit, restored wetlands, and 3,200 mixed-income units…"}
                  className="mt-5 h-64 w-full resize-none rounded-2xl border bg-[var(--surface)] p-5 font-display text-[19px] leading-[1.5] tracking-tight outline-none placeholder:text-muted-foreground/60 focus:border-[var(--amber)]"
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Try a sample</span>
                  {SAMPLES.map((s) => (
                    <button key={s} onClick={() => setProposal(s + " — ")}
                      className="rounded-full border bg-[var(--surface)] px-2.5 py-1 text-[11px] text-foreground/80 hover:border-[var(--forest)] hover:text-foreground">
                      {s}
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed px-4 py-2 text-xs text-muted-foreground hover:border-[var(--forest)] hover:text-foreground">
                    <Upload className="h-3.5 w-3.5" /> Upload PDF
                    <input type="file" hidden onChange={() => ingest()} />
                  </label>
                  <button onClick={ingest} className="inline-flex items-center gap-2 rounded-full bg-[var(--forest)] px-5 py-2 text-xs text-[var(--primary-foreground)]">
                    <Sparkles className="h-3.5 w-3.5" /> Extract signals
                  </button>
                  <span className="ml-auto hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:inline-flex">
                    <Command className="h-3 w-3" /> ⌘ + Enter to run
                  </span>
                  {phase === "ready" && (
                    <Link to="/pulse" className="inline-flex items-center gap-1 rounded-full bg-[var(--amber)] px-5 py-2 text-xs text-foreground">
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

              <div className="relative min-h-[520px] border-t lg:border-l lg:border-t-0">
                <ScanField phase={phase} />
              </div>
            </div>
          </div>

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

      {/* Editorial closing */}
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="glass-strong shadow-float relative overflow-hidden rounded-[28px] p-10 sm:p-14">
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(50% 60% at 0% 0%, color-mix(in oklab, var(--amber) 22%, transparent), transparent 60%), radial-gradient(40% 60% at 100% 100%, color-mix(in oklab, var(--sage) 22%, transparent), transparent 60%)"
          }} />
          <p className="relative text-[11px] uppercase tracking-[0.28em] text-muted-foreground">A note from the operating room</p>
          <p className="relative mt-4 max-w-3xl font-display text-3xl leading-[1.15] tracking-[-0.015em] sm:text-4xl">
            "Most governments make billion-dollar decisions with the tools of the 1970s.
            DecisionX puts a planet of simulated consequence on the cabinet table."
          </p>
          <div className="relative mt-6 text-xs text-muted-foreground">— Internal brief, Office of Strategic Foresight</div>
        </div>
      </section>
    </>
  );
}

function Orrery() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 520 520" className="h-full w-full">
        <defs>
          <radialGradient id="heroCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--terracotta)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--forest)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint topography */}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={260} cy={260} r={50 + i * 22} fill="none" stroke="var(--forest)" strokeOpacity={0.05} />
        ))}

        {/* halo */}
        <circle cx={260} cy={260} r={120} fill="url(#heroCore)" />

        {/* orbits with satellites */}
        {[110, 160, 210].map((r, i) => (
          <g key={r} style={{ transformOrigin: "260px 260px", animation: `dx-orbit ${30 + i * 14}s linear infinite ${i % 2 ? "reverse" : ""}` }}>
            <circle cx={260} cy={260} r={r} fill="none" stroke="var(--forest)" strokeOpacity={0.12} strokeDasharray="2 6" />
            <circle cx={260 + r} cy={260} r={i === 1 ? 7 : 5} fill={["var(--amber)","var(--sage)","var(--terracotta)"][i]} />
            <circle cx={260 - r * 0.7} cy={260 + r * 0.7} r={3} fill="var(--forest)" />
          </g>
        ))}

        {/* core glyph */}
        <circle cx={260} cy={260} r={36} fill="var(--surface)" stroke="var(--forest)" strokeOpacity={0.15} />
        <text x={260} y={256} textAnchor="middle" fontSize="9" letterSpacing="3" fill="var(--muted-foreground)">CONFIDENCE</text>
        <text x={260} y={278} textAnchor="middle" fontSize="22" fontFamily="Sora, sans-serif" fontWeight="500">82</text>
      </svg>

      {/* floating chips */}
      <div className="absolute left-2 top-6 animate-float">
        <Chip dot="var(--amber)" k="Economic" v="+0.6% GDP" />
      </div>
      <div className="absolute right-0 top-24 animate-float" style={{ animationDelay: "1.2s" }}>
        <Chip dot="var(--sage)" k="Environmental" v="Net positive" />
      </div>
      <div className="absolute bottom-10 left-6 animate-float" style={{ animationDelay: "2.4s" }}>
        <Chip dot="var(--terracotta)" k="Political" v="Bipartisan" />
      </div>
      <div className="absolute bottom-2 right-4 animate-float" style={{ animationDelay: "3.1s" }}>
        <Chip dot="var(--forest)" k="Citizen" v="61% favour" />
      </div>
    </div>
  );
}

function Chip({ dot, k, v }: { dot: string; k: string; v: string }) {
  return (
    <div className="glass-strong flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3 shadow-soft">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      <div className="leading-tight">
        <div className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
        <div className="text-xs font-medium">{v}</div>
      </div>
    </div>
  );
}

function ScanField({ phase }: { phase: "idle" | "scanning" | "ready" }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 520" preserveAspectRatio="none">
        <defs>
          <radialGradient id="halo2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="520" fill="url(#halo2)" />
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse key={i} cx="200" cy="260" rx={40 + i * 22} ry={26 + i * 14} fill="none" stroke="var(--forest)" strokeOpacity={0.06} />
        ))}
      </svg>

      {phase === "scanning" && (
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--amber)_22%,transparent)] to-transparent"
             style={{ animation: "dx-rise 1.9s ease-out both" }} />
      )}

      {INSIGHTS.map((n, i) => {
        const visible = phase === "ready";
        const color = n.tone === "amber" ? "var(--amber)" : n.tone === "sage" ? "var(--sage)" : "var(--terracotta)";
        return (
          <div key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
            style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: visible ? 1 : 0, transform: `translate(-50%,-50%) scale(${visible ? 1 : 0.7})`, transitionDelay: `${i * 110}ms` }}>
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

      {phase === "ready" && (
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {INSIGHTS.map((n, i) => (
            <line key={i} x1="50%" y1="50%" x2={`${n.x}%`} y2={`${n.y}%`}
                  stroke="var(--forest)" strokeOpacity="0.18" strokeDasharray="2 5" />
          ))}
        </svg>
      )}

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
