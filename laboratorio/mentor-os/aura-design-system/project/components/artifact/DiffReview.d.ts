import React from 'react';

export interface DiffRow { type: 'add' | 'del' | 'ctx'; text: React.ReactNode; }
export interface DiffReviewProps {
  rows: DiffRow[];
  className?: string;
}

/** DiffReview — add/del/context rows using the diff token pairs (pos/neg signals). */
export function DiffReview(props: DiffReviewProps): JSX.Element;
