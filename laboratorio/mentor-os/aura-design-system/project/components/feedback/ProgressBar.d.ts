import React from 'react';

export interface ProgressBarProps {
  /** 0–100. */
  value?: number;
  /** 10px tall track. */
  lg?: boolean;
  tone?: 'accent' | 'cool' | 'pos';
  className?: string;
}

/** ProgressBar — thin progress track (sm/lg) with recolorable fill. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
