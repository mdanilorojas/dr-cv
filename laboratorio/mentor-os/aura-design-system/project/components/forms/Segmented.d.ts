import React from 'react';

export interface SegmentedProps {
  /** Strings or {id,label} objects. */
  items: (string | { id: string; label: React.ReactNode })[];
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/** Segmented — inset pill group for 2–3 short exclusive options. */
export function Segmented(props: SegmentedProps): JSX.Element;
