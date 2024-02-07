import React, { ReactNode } from "react";
import './Card.scss';

const Card = (props: any): ReactNode => (
  <div className="card">
    {props.children}
  </div>
);

export default Card;