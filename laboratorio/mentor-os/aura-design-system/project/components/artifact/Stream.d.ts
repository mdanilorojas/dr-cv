import React from 'react';

export interface StreamProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show the blinking accent caret (default true). */
  caret?: boolean;
  children?: React.ReactNode;
}

/** Stream — monospace "visible thinking" surface with a blinking accent caret. */
export function Stream(props: StreamProps): JSX.Element;
