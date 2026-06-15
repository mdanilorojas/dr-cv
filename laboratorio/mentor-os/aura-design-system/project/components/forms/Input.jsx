import React from 'react';

/** Labeled text input with optional help text and focus ring. */
export function Input({ label, help, search = false, className = '', id, ...rest }) {
  const field = (
    search
      ? (
        <div className="search">
          <svg className="search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input id={id} className={['input', className].filter(Boolean).join(' ')} {...rest} />
        </div>
      )
      : <input id={id} className={['input', className].filter(Boolean).join(' ')} {...rest} />
  );
  if (!label && !help) return field;
  return (
    <div className="field">
      {label && <label className="field-label" htmlFor={id}>{label}</label>}
      {field}
      {help && <span className="field-help">{help}</span>}
    </div>
  );
}
