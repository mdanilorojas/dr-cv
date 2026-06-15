import React from 'react';

/** Monogram or photo avatar. Defaults to the DR monogram styling. */
export function Avatar({ src, alt = '', initials = 'DR', size = 'base', className = '', ...rest }) {
  const cls = ['avatar', size === 'lg' ? 'avatar--lg' : '', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {src ? <img src={src} alt={alt} /> : initials}
    </span>
  );
}

export function AvatarGroup({ className = '', children }) {
  return <div className={['avatar-group', className].filter(Boolean).join(' ')}>{children}</div>;
}
