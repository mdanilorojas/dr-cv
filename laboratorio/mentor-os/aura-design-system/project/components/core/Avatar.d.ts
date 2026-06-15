import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Omit to render the monogram initials. */
  src?: string;
  alt?: string;
  /** Monogram text when no src (default "DR"). */
  initials?: string;
  size?: 'base' | 'lg';
}

/** Avatar — monogram (default DR) or photo, in the accent-soft chip style. */
export function Avatar(props: AvatarProps): JSX.Element;
export function AvatarGroup(props: { className?: string; children?: React.ReactNode }): JSX.Element;
