import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  help?: React.ReactNode;
  children?: React.ReactNode;
}

/** Select — native select styled with the Aura caret + focus ring. */
export function Select(props: SelectProps): JSX.Element;
