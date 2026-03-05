export type CategoryId = 'identity' | 'routing' | 'spam' | 'obfuscation';

export interface Category {
  name: string;
  color: string;
  layer: number;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  identity:    { name: 'Identity & Credentialing', color: '#2563eb', layer: 0 },
  routing:     { name: 'Routing & Transport',      color: '#7c3aed', layer: 1 },
  spam:        { name: 'Spam & Sybil Resistance', color: '#dc2626', layer: 2 },
  obfuscation: { name: 'Traffic Obfuscation',     color: '#059669', layer: 3 },
};
