import React from 'react';

/** Small status pill. `mono` renders the JetBrains Mono uppercase variant. */
export function Badge({ variant = 'neutral', dot = false, mono = false, className = '', children, ...rest }) {
  const cls = [
    'badge',
    variant && variant !== 'neutral' ? `badge--${variant}` : '',
    dot ? 'badge--dot' : '',
    mono ? 'badge--mono' : '',
    className,
  ].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}</span>;
}
