import React from 'react';

/** Mastery badge — sacred semantics. Each level owns a fixed color pair; never reassign. */
export function Mastery({ level = 'novice', className = '', children, ...rest }) {
  const label = children ?? level.charAt(0).toUpperCase() + level.slice(1);
  return <span className={['mastery', `mastery--${level}`, className].filter(Boolean).join(' ')} {...rest}>{label}</span>;
}
