import React from 'react';

/** Plan-before-build checklist. `steps` = [{label, done}]. Uses the cool signal color. */
export function PlanSteps({ steps = [], className = '' }) {
  return (
    <div className={['plan', className].filter(Boolean).join(' ')}>
      {steps.map((s, i) => (
        <div key={i} className={['plan__step', s.done ? 'plan__step--done' : ''].filter(Boolean).join(' ')}>
          <span className="plan__marker">{s.done ? '✓' : i + 1}</span>
          {s.label}
        </div>
      ))}
    </div>
  );
}
