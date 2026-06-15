import React from 'react';

/**
 * Aura primary action control. Thin wrapper over the .btn class system —
 * styling lives in components.css so it stays token-driven and theme-aware.
 */
export function Button({
  variant = 'primary',
  size = 'base',
  iconOnly = false,
  block = false,
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'btn',
    variant && variant !== 'secondary' ? `btn--${variant}` : 'btn--secondary',
    size !== 'base' ? `btn--${size}` : '',
    iconOnly ? 'btn--icon' : '',
    block ? 'btn--block' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button className={cls} {...rest}>{children}</button>
  );
}
