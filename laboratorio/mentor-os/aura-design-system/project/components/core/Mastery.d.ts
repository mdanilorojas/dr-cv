import React from 'react';

export interface MasteryProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Skill mastery level. Each owns a fixed semantic color — never reassign. */
  level?: 'mastered' | 'proficient' | 'developing' | 'novice' | 'gap';
  children?: React.ReactNode;
}

/** Mastery — fixed-semantic skill level badge (mastered/proficient/developing/novice/gap). */
export function Mastery(props: MasteryProps): JSX.Element;
