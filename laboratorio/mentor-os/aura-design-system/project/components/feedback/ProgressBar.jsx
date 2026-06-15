import React from 'react';

/** Progress track. `value` 0–100. `tone` recolors the fill. */
export function ProgressBar({ value = 0, lg = false, tone = 'accent', className = '' }) {
  const fillTone = tone === 'accent' ? '' : `progress__fill--${tone}`;
  return (
    <div className={['progress', lg ? 'progress--lg' : '', className].filter(Boolean).join(' ')} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className={['progress__fill', fillTone].filter(Boolean).join(' ')} style={{ width: `${Math.max(0, Math.min(100, value))}%` }}></div>
    </div>
  );
}
