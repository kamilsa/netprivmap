# netprivmap

A structured map of Ethereum's networking privacy design space: atomic building blocks, their properties, relationships, and how they compose into full protocol proposals.

Live at [kamilsa.github.io/netprivmap](https://kamilsa.github.io/netprivmap).

## Overview

The deanonymization of network-layer validators is a critical systemic threat to Ethereum's robustness and censorship resistance. `netprivmap` provides a visual and technical taxonomy of the research being conducted to sever the link between a physical IP address and validator identities (attesters and proposers).

## Tech Stack

- [Astro 5](https://astro.build) (Static site generation)
- [React 19](https://react.dev) (Interactive islands)
- [Tailwind CSS v4](https://tailwindcss.com) (Modern styling)
- [D3](https://d3js.org) (Graph visualization)

## Local Development

Requires Node.js 22+ and npm.

```sh
# Install dependencies
npm install

# Seed content from data definitions
npm run seed

# Start development server
npm run dev
```

Opens at `http://localhost:4321`.

## Content Management

The project uses a "Data-to-Content" workflow to ensure consistency:
1. Define atoms, properties, and edges in `src/data/*.ts`.
2. Run `npm run seed` to regenerate markdown files in `src/content/`.
3. Use `npm run build` to verify the site and refresh the search index.

## Deployment

The site is deployed as a static build to GitHub Pages.

```sh
npm run build
```
