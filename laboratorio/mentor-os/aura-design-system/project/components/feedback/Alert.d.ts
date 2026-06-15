import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  children?: React.ReactNode;
}

/** Alert — inline callout with a colored accent bar (info/success/warning/danger). */
export function Alert(props: AlertProps): JSX.Element;
