import React from "react";

function FilterButton(props) {

  // (1)Replace all with {props.name}.
// (2)Set the value of aria-pressed to {props.isPressed}.
// (3)Add an onClick handler that calls props.setFilter() with the filter’s name.
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;