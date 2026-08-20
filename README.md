# CompanyScope Product Engineering

Senior product-engineering portfolio project for a global company-intelligence SaaS. It keeps the secure CompanyScope platform and adds decision-oriented product mechanics: explicit ranking lenses, user segments, saved decision context, measurable hypotheses and product analytics wired to meaningful decisions.

**Author:** Deniz Aslaner

## Product-engineering focus

- React 19 + strict TypeScript + Tailwind CSS 4
- 100 deterministic synthetic companies across 20 markets
- Decision Workbench with **Balanced, Growth, Risk-adjusted and Security** lenses
- Explicit user segments: all, verified, enterprise and scale-up
- Deterministic opportunity scoring with visible inputs instead of hidden ranking magic
- Persisted decision views for repeat research context
- Experiment Center connecting hypotheses to activation, time-to-insight and reuse metrics
- Typed product analytics for lens, segment, saved-view and experiment interactions
- Saved companies, comparison, feature flags and explainability
- Node BFF with session auth, CSRF, Origin checks and bounded AI Explainer
- 90% Vitest coverage gates + Playwright production-runtime E2E
- Storybook for decision-system primitives and Product Studio compositions
- Parallel hardened GitHub CI/CD with CodeQL, Dependency Review and full-SHA action pins
- Build-once artifact promotion, GHCR container smoke tests and rollback workflow

## Run locally

```bash
nvm install
nvm use
npm ci
cp .env.example .env
npm run dev:api
```

In a second terminal:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Product flows to demo

1. Register and enter the decision workspace.
2. Switch the decision lens and observe a different priority ranking.
3. Apply a segment and save the decision view.
4. Review an experiment hypothesis and discuss what telemetry would validate it.
5. Open a company, save it and compare shortlist evidence.
6. Use the bounded Explainer only after the user has narrowed the decision context.

## Product thesis

The same dataset can support very different decisions. CompanyScope Product makes that ambiguity explicit. A ranking is always tied to a visible lens and segment, and product events capture those inputs so teams can ask whether a workflow actually improves activation, time to insight or repeat research.

The displayed metrics and experiments are intentionally illustrative. The portfolio demonstrates **how** product decisions, instrumentation and learning loops connect without pretending synthetic data is production evidence.

## Quality gates

```bash
npm run verify
npm run audit:prod
npx playwright install chromium
npm run test:e2e:local
```

CI runs lint, strict TypeScript, 90% coverage gates, production build, Storybook build, Playwright E2E, dependency audit and container smoke tests. `CI / Quality Gate` is designed as the stable branch-protection status.

See `docs/product-strategy.md`, `docs/decision-system.md`, `docs/metrics.md`, `docs/experiment.md`, `docs/testing.md`, `docs/ci-cd.md` and `SECURITY.md`.
