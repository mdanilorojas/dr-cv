import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Accent = hairline-ring variant; primary = flat accent fill (no glow). */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
  /** Control height: sm 28px · base 36px · lg 44px. */
  size?: 'sm' | 'base' | 'lg';
  /** Square icon-only button (width = height). */
  iconOnly?: boolean;
  /** Full-width. */
  block?: boolean;
  children?: React.ReactNode;
}

/**
 * Button — the primary action control for the Aura app surface.
 */
export function Button(props: ButtonProps): JSX.Element;
