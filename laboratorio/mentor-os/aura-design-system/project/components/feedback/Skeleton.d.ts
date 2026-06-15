import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
}

/** Skeleton — shimmer loading placeholder (honors reduced-motion). */
export function Skeleton(props: SkeletonProps): JSX.Element;
