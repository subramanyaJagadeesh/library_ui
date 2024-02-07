import React, { ReactNode } from "react";
import './Card.scss';

const Card = ({header, body, src, footer}: {header: string, body: ReactNode, src: string, footer: ReactNode}): ReactNode => (
  <div className="card">
    <div className="card-header">
      <h4>{header}</h4>
    </div>
    <img src={src} />
    {body && 
      <div className="card-body">
        {body}
      </div>
    }
    {footer && 
      <div className="card-footer">
        <h5>{footer}</h5>
      </div>
    }
  </div>
);

export default Card;