import React from 'react';

/** Shimmer placeholder. Size with width/height (or className). */
export function Skeleton({ width, height = 14, radius, className = '', style = {}, ...rest }) {
  return <div className={['skeleton', className].filter(Boolean).join(' ')} style={{ width, height, borderRadius: radius, ...style }} {...rest}></div>;
}
