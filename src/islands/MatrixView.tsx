import { useState, useMemo } from 'react';
import { ATOMS } from '../data/atoms';
import { PROPERTIES } from '../data/properties';
import { CATEGORIES } from '../data/categories';
import { MATURITY_LABELS } from '../data/maturity';

export default function MatrixView() {
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null);

  return (
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e0ddd6' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', background: '#fff' }}>
        <thead>
          <tr>
            <th rowSpan={2} style={{ position: 'sticky', left: 0, zIndex: 10, background: '#faf9f7', width: '240px', minWidth: '240px', padding: '12px', borderBottom: '2px solid #e0ddd6', borderRight: '2px solid #e0ddd6', textAlign: 'left' }}>
              Atom
            </th>
            {PROPERTIES.map(prop => (
              <th 
                key={prop.id}
                onMouseEnter={() => setHoveredProperty(prop.id)}
                onMouseLeave={() => setHoveredProperty(null)}
                style={{ 
                  padding: '8px 4px', 
                  borderRight: '1px solid #e0ddd6', 
                  background: hoveredProperty === prop.id ? '#f0eeeb' : '#faf9f7',
                  textAlign: 'center',
                  cursor: 'help'
                }}
                title={prop.name + ': ' + prop.description}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }}>{prop.id}</span>
              </th>
            ))}
          </tr>
          <tr>
            {PROPERTIES.map(prop => (
              <th 
                key={prop.id}
                style={{ 
                  padding: '4px', 
                  borderBottom: '2px solid #e0ddd6', 
                  borderRight: '1px solid #e0ddd6', 
                  background: hoveredProperty === prop.id ? '#f0eeeb' : '#faf9f7',
                  fontSize: '9px',
                  color: '#a8a29e',
                  textTransform: 'uppercase',
                  writingMode: 'vertical-lr',
                  height: '100px',
                  textAlign: 'left'
                }}
              >
                {prop.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ATOMS.map((atom, i) => {
            const cat = CATEGORIES[atom.cat];
            return (
              <tr key={atom.id} style={{ background: i % 2 === 0 ? '#fff' : '#faf9f7' }}>
                <td style={{ position: 'sticky', left: 0, zIndex: 5, background: 'inherit', padding: '8px 12px', borderBottom: '1px solid #e0ddd6', borderRight: '2px solid #e0ddd6' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold', color: cat.color }}>{atom.id}</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{atom.name}</span>
                  </div>
                </td>
                {PROPERTIES.map(prop => {
                  const isBenefit = atom.benefits.includes(prop.id);
                  const isHurt = atom.hurts.includes(prop.id);
                  return (
                    <td 
                      key={prop.id}
                      style={{ 
                        textAlign: 'center', 
                        borderBottom: '1px solid #e0ddd6', 
                        borderRight: '1px solid #e0ddd6',
                        background: hoveredProperty === prop.id ? '#f0eeeb' : 'transparent'
                      }}
                    >
                      {isBenefit && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', margin: '0 auto' }} />}
                      {isHurt && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', margin: '0 auto' }} />}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
