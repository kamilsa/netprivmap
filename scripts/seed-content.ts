import fs from 'node:fs';
import path from 'node:path';
import { ATOMS } from '../src/data/atoms';
import { PROPERTIES } from '../src/data/properties';
import { COMPOSITES } from '../src/data/composites';
import { EDGES } from '../src/data/edges';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// === Atoms ===
const atomDir = path.join(CONTENT_DIR, 'atoms');
if (!fs.existsSync(atomDir)) fs.mkdirSync(atomDir, { recursive: true });

for (const atom of ATOMS) {
  const filename = `${slugify(atom.id)}-${slugify(atom.name)}.md`;
  const outgoing = EDGES.filter(e => e.from === atom.id);
  const relRows = [
    ...atom.benefits.map(p => `| ${p} | benefits | |`),
    ...atom.hurts.map(p => `| ${p} | hurts | |`),
    ...outgoing.map(e => `| ${e.to} | ${e.type} | ${e.note ?? ''} |`)
  ];

  const relTable = relRows.length > 0
    ? `| Target | Type | Note |\n|--------|------|------|\n${relRows.join('\n')}`
    : '_No relationships defined._';

  const content = `---
id: ${atom.id}
name: "${atom.name}"
category: ${atom.cat}
maturity: ${atom.maturity}
---

## Description

${atom.desc}

## Relationships

${relTable}

## Open questions

${atom.openQs.map(q => `- ${q}`).join('\n')}

## References

${atom.refs.map(r => `- ${r}`).join('\n')}
`;
  fs.writeFileSync(path.join(atomDir, filename), content);
}

// === Properties ===
const propDir = path.join(CONTENT_DIR, 'properties');
if (!fs.existsSync(propDir)) fs.mkdirSync(propDir, { recursive: true });

for (const prop of PROPERTIES) {
  const filename = `${slugify(prop.id)}-${slugify(prop.name)}.md`;
  const content = `---
id: ${prop.id}
name: "${prop.name}"
---

## Description

${prop.description}

## Evaluation

_Evaluation criteria to be defined._
`;
  fs.writeFileSync(path.join(propDir, filename), content);
}

// === Composites ===
const compDir = path.join(CONTENT_DIR, 'composites');
if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });

for (const comp of COMPOSITES) {
  const filename = `${slugify(comp.id)}.md`;
  const content = `---
id: "${comp.id}"
name: "${comp.name}"
maturity: ${comp.maturity}
atoms: ${JSON.stringify(comp.atoms)}
---

## Description

${comp.desc}

## Key properties

${comp.keyProps}

## Limitations

${comp.limitations}

## References

${comp.refs.map(r => `- ${r}`).join('\n')}
`;
  fs.writeFileSync(path.join(compDir, filename), content);
}

console.log('Seeding complete.');
