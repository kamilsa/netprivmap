import { ATOMS } from '../data/atoms';
import { COMPOSITES } from '../data/composites';
import { CATEGORIES } from '../data/categories';

export default function CompareView() {
  return (
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #e0ddd6' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', background: '#fff' }}>
        <thead>
          <tr>
            <th style={{ position: 'sticky', left: 0, zIndex: 10, background: '#faf9f7', width: '240px', minWidth: '240px', padding: '12px', borderBottom: '2px solid #e0ddd6', borderRight: '2px solid #e0ddd6', textAlign: 'left' }}>
              Atom
            </th>
            {COMPOSITES.map(comp => (
              <th 
                key={comp.id}
                style={{ 
                  padding: '12px 8px', 
                  borderBottom: '2px solid #e0ddd6', 
                  borderRight: '1px solid #e0ddd6', 
                  background: '#faf9f7',
                  textAlign: 'center',
                  minWidth: '150px'
                }}
              >
                <a href={`/composites/${comp.id.toLowerCase()}`} style={{ fontSize: '13px', fontWeight: 'bold', color: '#1c1917', textDecoration: 'none' }}>
                  {comp.name}
                </a>
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
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{atom.name}</span>
                  </div>
                </td>
                {COMPOSITES.map(comp => {
                  const isIncluded = comp.atoms.includes(atom.id);
                  return (
                    <td 
                      key={comp.id}
                      style={{ 
                        textAlign: 'center', 
                        borderBottom: '1px solid #e0ddd6', 
                        borderRight: '1px solid #e0ddd6'
                      }}
                    >
                      {isIncluded && (
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          borderRadius: '2px', 
                          background: cat.color, 
                          margin: '0 auto',
                          opacity: 0.8
                        }} />
                      )}
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
