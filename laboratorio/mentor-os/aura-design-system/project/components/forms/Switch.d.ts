import React from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
}

/** Switch — 38×22 toggle; fills with accent when on. */
export function Switch(props: SwitchProps): JSX.Element;
