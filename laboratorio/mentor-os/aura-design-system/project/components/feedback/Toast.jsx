import React from 'react';

/** Transient notification surface. Pair with your own positioning / timeout. */
export function Toast({ className = '', children, ...rest }) {
  return (
    <div className={['toast', className].filter(Boolean).join(' ')} role="status" {...rest}>
      <span className="toast__dot" aria-hidden="true"></span>
      <span>{children}</span>
    </div>
  );
}
