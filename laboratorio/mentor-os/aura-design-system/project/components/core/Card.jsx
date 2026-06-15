import React from 'react';

/** Surface container with hairline border + soft shadow. Compose header/body or use `pad`. */
export function Card({ pad = false, className = '', children, ...rest }) {
  return <div className={['card', pad ? 'card--pad' : '', className].filter(Boolean).join(' ')} {...rest}>{children}</div>;
}

export function CardHeader({ title, sub, trailing, className = '', children }) {
  return (
    <div className={['card__header', className].filter(Boolean).join(' ')}>
      {children ?? (
        <div>
          {title && <div className="card__title">{title}</div>}
          {sub && <div className="card__sub">{sub}</div>}
        </div>
      )}
      {trailing && <div className="card__trailing">{trailing}</div>}
    </div>
  );
}

export function CardBody({ className = '', children }) {
  return <div className={['card__body', className].filter(Boolean).join(' ')}>{children}</div>;
}
