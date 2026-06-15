import React from 'react';

/** Segmented control for 2–3 short, mutually-exclusive options. */
export function Segmented({ items = [], value, onChange, className = '' }) {
  return (
    <div className={['segmented', className].filter(Boolean).join(' ')} role="group">
      {items.map(it => {
        const id = typeof it === 'string' ? it : it.id;
        const label = typeof it === 'string' ? it : it.label;
        return (
          <button key={id} className={['segmented__item', value === id ? 'segmented__item--active' : ''].filter(Boolean).join(' ')}
            onClick={() => onChange && onChange(id)}>{label}</button>
        );
      })}
    </div>
  );
}
