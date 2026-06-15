import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply default padding directly to the card (skip CardBody). */
  pad?: boolean;
  children?: React.ReactNode;
}
export interface CardHeaderProps {
  title?: React.ReactNode;
  sub?: React.ReactNode;
  /** Right-aligned slot (badge, menu, action). */
  trailing?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Card — the primary surface container: hairline border + soft shadow.
 */
export function Card(props: CardProps): JSX.Element;
export function CardHeader(props: CardHeaderProps): JSX.Element;
export function CardBody(props: { className?: string; children?: React.ReactNode }): JSX.Element;
