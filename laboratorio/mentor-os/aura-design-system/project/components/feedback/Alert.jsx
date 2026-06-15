import React from 'react';

/** Inline callout with a colored accent bar. */
export function Alert({ variant = 'info', title, className = '', children, ...rest }) {
  return (
    <div className={['alert', `alert--${variant}`, className].filter(Boolean).join(' ')} role="status" {...rest}>
      <span className="alert__bar" aria-hidden="true"></span>
      <div>
        {title && <div className="alert__title">{title}</div>}
        {children}
      </div>
    </div>
  );
}
