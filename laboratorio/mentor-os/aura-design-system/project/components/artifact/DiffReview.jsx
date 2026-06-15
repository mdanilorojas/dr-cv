import React from 'react';

/** Diff-review block. `rows` = [{type:'add'|'del'|'ctx', text}]. */
export function DiffReview({ rows = [], className = '' }) {
  const sign = t => (t === 'add' ? '+' : t === 'del' ? '−' : ' ');
  return (
    <div className={['diff', className].filter(Boolean).join(' ')}>
      {rows.map((r, i) => (
        <div key={i} className={['diff__row', r.type === 'add' ? 'diff__row--add' : r.type === 'del' ? 'diff__row--del' : ''].filter(Boolean).join(' ')}>
          <span className="diff__sign">{sign(r.type)}</span>{r.text}
        </div>
      ))}
    </div>
  );
}
