import React from 'react';

export interface SkillChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

/** SkillChip — accent chip labeling a named, invocable skill (mono, ⌘ prefix). */
export function SkillChip(props: SkillChipProps): JSX.Element;
