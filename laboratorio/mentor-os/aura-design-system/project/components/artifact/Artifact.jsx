import React from 'react';

/**
 * Artifact frame — the signature surface that wraps a running/produced AI artifact.
 * Header shows a live dot, file name, meta, and a status. Body holds the embed.
 */
export function Artifact({ file, meta, status = 'ready', className = '', children }) {
  return (
    <div className={['artifact', className].filter(Boolean).join(' ')}>
      <div className="artifact__head">
        <span className="artifact__dot" aria-hidden="true"></span>
        {file && <span className="artifact__file">{file}</span>}
        {meta && <span>· {meta}</span>}
        {status && <span className="artifact__status">{status}</span>}
      </div>
      <div className="artifact__body">{children}</div>
    </div>
  );
}

/** PDF / file embed well shown inside an Artifact body. */
export function EmbedWell({ kind = 'PDF', title, meta }) {
  return (
    <div className="embed-well">
      <div className="embed-well__icon">{kind}</div>
      <div>
        {title && <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>{title}</div>}
        {meta && <div style={{ color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{meta}</div>}
      </div>
    </div>
  );
}
