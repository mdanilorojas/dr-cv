import React from 'react';

/** Dark popover label. */
export function Tooltip({ className = '', children, ...rest }) {
  return <span className={['tooltip', className].filter(Boolean).join(' ')} role="tooltip" {...rest}>{children}</span>;
}
