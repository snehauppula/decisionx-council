# decisionx-council - DecisionX

A front-end prototype of **DecisionX**, an AI-assisted decision evaluation experience. Upload a proposal, watch the signals inside it surface, and see a council of five AI advisor personas debate the decision before an executive briefing wraps it up.

## Experience flow

1. **Decision Intake** - paste or upload a proposal; the page scans it and surfaces extracted signals such as budget, location, stakeholders and risks
2. **AI Council** - five advisor personas (for example an Environmental Scientist and a Citizen Representative) debate the decision in a circular chamber
3. **Decision Pulse** - a read on the decision's momentum
4. **Future Ripple Map** - second-order effects, mapped
5. **Executive Briefing** - the final summary

> Note: this repository is a front-end experience. The analysis is simulated in the browser; no backend or live AI calls are included yet.

## Tech stack

- TanStack Start (React 19 + TypeScript) with file-based routing
- Vite, Tailwind CSS 4, Radix UI primitives
- Recharts for charts

## Getting started

```bash
npm install
npm run dev       # development server
npm run build     # production build
npm run preview   # preview the build
```
