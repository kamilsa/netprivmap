export type EdgeType =
  | 'requires'
  | 'enables'
  | 'benefits from'
  | 'conflicts'
  | 'complements';

export interface Edge {
  from: string;
  to: string;
  type: EdgeType;
  note?: string;
}

export const EDGES: Edge[] = [
  { from: 'A1', to: 'A2', type: 'complements', note: 'ZK-PoV secures the endpoints of the OHTTP shuffle.' },
  { from: 'A6', to: 'A2', type: 'enables', note: 'Pre-warmed connections are required to meet OHTTP latency targets.' },
  { from: 'A1', to: 'A3', type: 'benefits from', note: 'Anonymous meshes need global rate limiting to prevent DoS.' },
  { from: 'A5', to: 'A1', type: 'complements', note: 'Privacy Pass principles inform the ZK-PoV architecture.' },
  { from: 'A7', to: 'A2', type: 'complements', note: 'Flashnet provides a threshold-based evolution of the OHTTP relay model.' },
  { from: 'A4', to: 'A8', type: 'complements', note: 'Mixnets rely on decoy traffic to prevent volumetric and timing analysis.' },
  { from: 'A1', to: 'A8', type: 'complements', note: 'ZK credentials can gate access to the mixnet to prevent Sybil flooding.' },
];
