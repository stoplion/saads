import * as React from "react";

export function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{props.title}</h2>
      </div>
      <div className="card-body">
        <p>{props.body}</p>
      </div>
    </div>
  );
}
