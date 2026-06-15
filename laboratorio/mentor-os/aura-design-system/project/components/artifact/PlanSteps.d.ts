import React from 'react';

export interface PlanStep { label: React.ReactNode; done?: boolean; }
export interface PlanStepsProps {
  steps: PlanStep[];
  className?: string;
}

/** PlanSteps — plan-before-build checklist using the cool (tool-use) signal color. */
export function PlanSteps(props: PlanStepsProps): JSX.Element;
