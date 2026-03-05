export const MATURITY_LABELS = {
  research: 'Research',
  development: 'Development',
  implementation: 'Implementation',
  standardized: 'Standardized',
  deployed: 'Deployed'
} as const;

export const MATURITY_COLORS = {
  research: '#f87171',
  development: '#fb923c',
  implementation: '#facc15',
  standardized: '#a3e635',
  deployed: '#34d399'
} as const;

export type MaturityLevel = keyof typeof MATURITY_LABELS;
