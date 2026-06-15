import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  /** Leading status dot in current color. */
  dot?: boolean;
  /** JetBrains Mono, uppercase, micro tracking — for codes / versions / metadata. */
  mono?: boolean;
  children?: React.ReactNode;
}

/** Badge — compact status / metadata pill. */
export function Badge(props: BadgeProps): JSX.Element;
