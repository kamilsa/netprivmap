import { useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { ATOMS } from '../data/atoms';
import { EDGES } from '../data/edges';
import { CATEGORIES } from '../data/categories';
import { MATURITY_LABELS } from '../data/maturity';
import { BASE } from '../lib/base';
import type { Atom } from '../data/atoms';
import type { EdgeType } from '../data/edges';
import type { CategoryId } from '../data/categories';

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
}

const EDGE_STYLES: Record<EdgeType, { color: string; dash: string; arrow: boolean }> = {
  'requires':      { color: '#dc2626', dash: 'none', arrow: true },
  'enables':       { color: '#16a34a', dash: 'none', arrow: true },
  'benefits from': { color: '#2563eb', dash: '5,4',  arrow: true },
  'conflicts':     { color: '#ea580c', dash: '5,4',  arrow: true },
  'complements':   { color: '#0891b2', dash: 'none', arrow: false },
};

const ALL_EDGE_TYPES = Object.keys(EDGE_STYLES) as EdgeType[];
const ALL_CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

const W = 1000;
const H = 600;

function computeLayout(width: number, height: number): Record<string, { x: number; y: number }> {
  const nodes: SimNode[] = ATOMS.map(a => ({ id: a.id, x: width / 2, y: height / 2 }));
  const links = EDGES.map(e => ({ source: e.from, target: e.to, type: e.type }));

  const sim = d3
    .forceSimulation<SimNode>(nodes)
    .force('link', d3.forceLink<SimNode, any>(links).id(d => d.id).distance(100).strength(0.5))
    .force('charge', d3.forceManyBody<SimNode>().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide<SimNode>(40));

  sim.stop();
  for (let i = 0; i < 300; i++) sim.tick();

  const pos: Record<string, { x: number; y: number }> = {};
  for (const n of nodes) {
    pos[n.id] = { x: n.x ?? 0, y: n.y ?? 0 };
  }
  return pos;
}

const POSITIONS = computeLayout(W, H);
const ATOM_MAP: Record<string, Atom> = Object.fromEntries(ATOMS.map(a => [a.id, a]));

export default function GraphView() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const connectedIds = useMemo<Set<string>>(() => {
    if (!selectedId) return new Set();
    const ids = new Set<string>();
    for (const e of EDGES) {
      if (e.from === selectedId) ids.add(e.to);
      if (e.to === selectedId) ids.add(e.from);
    }
    ids.add(selectedId);
    return ids;
  }, [selectedId]);

  const selectedAtom = selectedId != null ? ATOM_MAP[selectedId] : null;

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, position: 'relative', background: '#faf9f7', borderRadius: '12px', border: '1px solid #e0ddd6', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
          <defs>
            {ALL_EDGE_TYPES.map(type => (
              <marker
                key={type}
                id={`arrow-${type.replace(/\s+/g, '-')}`}
                viewBox="0 0 10 10"
                refX="25"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={EDGE_STYLES[type].color} />
              </marker>
            ))}
          </defs>

          {/* Edges */}
          <g>
            {EDGES.map((edge, i) => {
              const from = POSITIONS[edge.from];
              const to = POSITIONS[edge.to];
              if (!from || !to) return null;
              const style = EDGE_STYLES[edge.type];
              const isDimmed = selectedId && !(connectedIds.has(edge.from) && connectedIds.has(edge.to));
              return (
                <line
                  key={i}
                  x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                  stroke={style.color}
                  strokeWidth={1.5}
                  strokeDasharray={style.dash === 'none' ? undefined : style.dash}
                  opacity={isDimmed ? 0.1 : 0.6}
                  markerEnd={style.arrow ? `url(#arrow-${edge.type.replace(/\s+/g, '-')})` : undefined}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {ATOMS.map(atom => {
              const pos = POSITIONS[atom.id];
              if (!pos) return null;
              const cat = CATEGORIES[atom.cat];
              const isSelected = selectedId === atom.id;
              const isDimmed = selectedId && !connectedIds.has(atom.id);
              return (
                <g
                  key={atom.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedId(prev => prev === atom.id ? null : atom.id)}
                  style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
                  opacity={isDimmed ? 0.2 : 1}
                >
                  <circle
                    r={isSelected ? 22 : 18}
                    fill={cat.color + '22'}
                    stroke={cat.color}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="10px"
                    fontWeight="bold"
                    fontFamily="monospace"
                    fill={cat.color}
                  >
                    {atom.id}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="32"
                    fontSize="9px"
                    fill="#57534e"
                    fontWeight="500"
                  >
                    {atom.name.split(' (')[0]}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {selectedAtom && (
        <div style={{ width: '300px', background: '#fff', border: '1px solid #e0ddd6', borderRadius: '12px', padding: '20px', position: 'sticky', top: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: CATEGORIES[selectedAtom.cat].color }}>{selectedAtom.id}</span>
            <button onClick={() => setSelectedId(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#a8a29e' }}>✕</button>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{selectedAtom.name}</h3>
          <p style={{ fontSize: '13px', color: '#57534e', lineHeight: '1.5', marginBottom: '16px' }}>{selectedAtom.desc}</p>
          <a href={`${BASE}/atoms/${selectedAtom.id.toLowerCase()}`} style={{ fontSize: '13px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>View full detail →</a>
        </div>
      )}
    </div>
  );
}
