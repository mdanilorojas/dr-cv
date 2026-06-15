import React from 'react';

export interface TabItem { id: string; label: React.ReactNode; }
export interface TabsProps {
  items: TabItem[];
  /** Active tab id. */
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/** Tabs — underline tab bar with an accent active indicator. */
export function Tabs(props: TabsProps): JSX.Element;
