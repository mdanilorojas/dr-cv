import React from 'react';

/** Underline tabs. `items` = [{id,label}]; controlled via `value` + `onChange(id)`. */
export function Tabs({ items = [], value, onChange, className = '' }) {
  return (
    <div className={['tabs', className].filter(Boolean).join(' ')} role="tablist">
      {items.map(it => (
        <button key={it.id} role="tab" aria-selected={value === it.id}
          className={['tab', value === it.id ? 'tab--active' : ''].filter(Boolean).join(' ')}
          onClick={() => onChange && onChange(it.id)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
