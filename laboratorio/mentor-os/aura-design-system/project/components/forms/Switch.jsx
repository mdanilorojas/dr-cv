import React from 'react';

/** Toggle switch. Controlled via `checked` + `onChange`, like a native checkbox. */
export function Switch({ checked, defaultChecked, onChange, className = '', ...rest }) {
  return (
    <label className={['switch', className].filter(Boolean).join(' ')}>
      <input type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={onChange} {...rest} />
      <span className="switch__track"></span>
    </label>
  );
}
