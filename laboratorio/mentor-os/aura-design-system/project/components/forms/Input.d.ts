import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Help text below the field. */
  help?: React.ReactNode;
  /** Render with a leading search icon. */
  search?: boolean;
}

/** Input — labeled text field with accent focus ring (0 0 0 3px at 18%). */
export function Input(props: InputProps): JSX.Element;
