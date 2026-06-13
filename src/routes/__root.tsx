import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display">404</h1>
        <p className="mt-3 text-muted-foreground">This future does not exist.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Return to intake</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-display">Simulation interrupted</h1>
        <p className="mt-2 text-sm text-muted-foreground">A signal was lost. You can retry the projection.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">Retry</button>
          <a href="/" className="rounded-full border px-5 py-2 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DecisionX — Future Simulation OS" },
      { name: "description", content: "DecisionX lets governments and planners see the consequences of decisions before implementation." },
      { property: "og:title", content: "DecisionX — Future Simulation OS" },
      { property: "og:description", content: "See the consequences of decisions before implementation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "Intake" },
  { to: "/pulse", label: "Pulse" },
  { to: "/council", label: "AI Council" },
  { to: "/ripple", label: "Ripple Map" },
  { to: "/briefing", label: "Briefing" },
] as const;

function TopNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass-strong shadow-soft flex items-center gap-1 rounded-full px-2 py-1.5">
        <Link to="/" className="flex items-center gap-2 px-3 py-1.5">
          <span className="relative inline-flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[var(--amber)] opacity-30 animate-pulse-slow" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--forest)]" />
          </span>
          <span className="font-display text-sm tracking-tight">DecisionX</span>
          <span className="ml-1 hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">Future OS</span>
        </Link>
        <span className="mx-1 h-5 w-px bg-border" />
        {NAV.map((n) => {
          const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              className={
                "rounded-full px-3 py-1.5 text-xs transition-colors " +
                (active
                  ? "bg-[var(--forest)] text-[var(--primary-foreground)]"
                  : "text-foreground/70 hover:text-foreground")
              }
            >
              {n.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <TopNav />
      <main className="pt-24">
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
