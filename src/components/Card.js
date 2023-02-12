import React from "react";
import "../styles/Card.css";

export default function Card(props) {
  return (
    <img
      className="Card"
      src={props.image}
      alt={props.name}
      style={{ transform: `${props.transform}` }}
    />
  );
}
