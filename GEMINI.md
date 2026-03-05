# Ethereum Networking Privacy Map Mandates

This repository serves as a structured knowledge map for Ethereum networking privacy research. All contributions and modifications must adhere to these foundational mandates.

## Engineering Standards

- **Tech Stack:** Adhere to **Astro 5**, **React**, and **Tailwind CSS v4**. Avoid adding legacy CSS frameworks.
- **Data Integrity:** All "Atoms," "Properties," and "Composites" must be defined in `src/data/*.ts`.
- **Consistency:** Use the `npm run seed` command to regenerate markdown content in `src/content/` whenever data files are modified. Never edit `src/content/` manually for structural changes.
- **Visuals:** Maintain the "academic/warm neutral" aesthetic defined in `src/styles/global.css`.

## Research & Documentation

- **Clickable References:** Every reference added to an Atom or Composite MUST be a valid, clickable markdown link.
- **Link Verification:** Before adding a new external URL, use `web_fetch` or `browser_navigate` to verify that the page is live and contains the relevant technical content.
- **Privacy First:** Focus on severe threat vectors like attester and proposer deanonymization, severing the IP-to-identity link as per current EF research priorities.
- **PDF/Transcript Integration:** Regularly reference local assets in `resources/` for primary source material.

## Agent Workflow

- **Validation:** Always verify the build with `npm run build` after making structural or content-seeding changes.
- **Context Efficiency:** Use parallel searches and reads to minimize tokens while maintaining high signal-to-noise ratio.
