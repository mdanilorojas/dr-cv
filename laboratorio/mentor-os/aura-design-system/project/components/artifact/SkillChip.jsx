import React from 'react';

/** Named-skill chip — accent chip with a mono uppercase label and ⌘ glyph. */
export function SkillChip({ className = '', children, ...rest }) {
  return <span className={['skill-chip', className].filter(Boolean).join(' ')} {...rest}>{children}</span>;
}
