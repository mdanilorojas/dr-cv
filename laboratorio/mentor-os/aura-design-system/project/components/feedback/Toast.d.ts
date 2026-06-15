import React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/** Toast — floating notification with an accent dot. */
export function Toast(props: ToastProps): JSX.Element;
