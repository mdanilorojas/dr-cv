import React from 'react';

export interface ArtifactProps {
  /** File name shown in the header (e.g. "cv-serious.en.pdf"). */
  file?: React.ReactNode;
  /** Secondary meta (e.g. "generated 14 Jun 2026"). */
  meta?: React.ReactNode;
  /** Right-aligned status (default "ready"). */
  status?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
export interface EmbedWellProps {
  /** Short type label in the file icon (PDF, MD, PNG…). */
  kind?: string;
  title?: React.ReactNode;
  meta?: React.ReactNode;
}

/**
 * Artifact — the signature frame wrapping a produced/running AI artifact (product UI, not decoration).
 */
export function Artifact(props: ArtifactProps): JSX.Element;
export function EmbedWell(props: EmbedWellProps): JSX.Element;
