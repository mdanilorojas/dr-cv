import React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

/** Tooltip — small elevated popover label. */
export function Tooltip(props: TooltipProps): JSX.Element;
