# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**netprivmap** is a visual knowledge map of Ethereum's networking privacy design space. It models relationships between atomic privacy-preserving techniques (atoms), measurable design dimensions (properties), and complete protocol proposals (composites).

## Commands

```bash
npm run dev       # Start local dev server at http://localhost:4321
npm run seed      # Regenerate src/content/ markdown from src/data/ definitions
npm run build     # Build static site for GitHub Pages deployment
npm run preview   # Preview production build locally
```

Always run `npm run build` after changes to verify the site compiles without errors.

## Architecture

### Data-Driven Design

The single source of truth lives in `src/data/*.ts`:

- **`atoms.ts`** — Atomic privacy techniques (ZK-PoV, Dandelion++, RLN, etc.) with metadata: id, name, category, maturity, description, benefits/hurts to properties, references
- **`properties.ts`** — 9 measurable design dimensions (P1–P9): latency, bandwidth, identity unlinkability, sybil resistance, GPA resistance, BFT compatibility, implementation complexity, economic deterrence, censorship resilience
- **`composites.ts`** — Complete protocol proposals combining multiple atoms
- **`edges.ts`** — Typed relationships between atoms (requires, enables, benefits-from, conflicts, complements, evolves, alternative)
- **`categories.ts`** / **`maturity.ts`** — Taxonomy helpers

### Content Generation

`src/content/` contains **auto-generated** markdown files. **Never edit these directly.** After modifying data files, run `npm run seed` to regenerate them via `scripts/seed-content.ts`.

### Pages & Islands

Static `.astro` pages in `src/pages/` render the content. Interactive components in `src/islands/` are React components hydrated client-side:

- **`GraphView.tsx`** — D3 force-directed graph visualizing atom→atom edges with property filtering
- **`MatrixView.tsx`** — Atoms × Properties heatmap (benefits/hurts)
- **`CompareView.tsx`** — Side-by-side atom comparison

### Deployment

The site deploys to GitHub Pages with `base: '/netprivmap'` set in `astro.config.mjs`. Use the `BASE_URL` helper from `src/lib/base.ts` for all internal links.

## Engineering Standards

- All new atoms, properties, and composites go in `src/data/*.ts` — never hand-write markdown in `src/content/`
- All references must be clickable markdown links; verify external URLs before adding
- Tailwind CSS v4 for styling; maintain the "academic/warm neutral" aesthetic using the established CSS variables (`--c-text`, `--c-text-2`, `--c-text-3`, `--c-border`, `--c-border-strong`)
- Focus on severe threat vectors: attester/proposer deanonymization at the network layer
- Research assets (PDFs, transcripts) live in `resources/` (git-ignored, not published)
