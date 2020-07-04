import React, { useState } from "react";

function Form(props) {
  // Handling form submission
  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(name);
    setName("");
  }
  

// State and the useState hook
  const [name, setName] = useState("");

// Updating state: store the updated state of the name as the input value changes! 
  function handleChange(e) {
    setName(e.target.value);
  }

 
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      {/*Down in the return statement */}
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        // Reading state
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;