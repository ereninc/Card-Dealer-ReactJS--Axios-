import React from "react";

export default function Card(props) {
  return <img className="Card" src={props.image} alt={props.name} />;
}
