import React from 'react';

/** Labeled native select with the Aura caret. */
export function Select({ label, help, className = '', id, children, ...rest }) {
  const field = <select id={id} className={['select', className].filter(Boolean).join(' ')} {...rest}>{children}</select>;
  if (!label && !help) return field;
  return (
    <div className="field">
      {label && <label className="field-label" htmlFor={id}>{label}</label>}
      {field}
      {help && <span className="field-help">{help}</span>}
    </div>
  );
}
