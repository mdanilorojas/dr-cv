import React from 'react';

/** "Visible thinking" stream with a blinking accent caret. */
export function Stream({ caret = true, className = '', children, ...rest }) {
  return (
    <div className={['stream', className].filter(Boolean).join(' ')} {...rest}>
      {children}
      {caret && <span className="stream__caret" aria-hidden="true"></span>}
    </div>
  );
}
