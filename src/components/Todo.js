import React, { useState } from "react";

export default function Todo(props)  {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  // two possible “templates", rather than the single template it's used so far:

// (1)The "editing" template, when we are editing a todo. We're about to create this.
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
  id={props.id}
  className="todo-text"
  type="text"
  value={newName}
  onChange={handleChange}
/>
      </div>
      <div className="btn-group">
      {/*  onClick handler to the "Cancel" button in the editingTemplate, but this time we'll set isEditing to false so that it switches us back to the view template. */}
      <button
  type="button"
  className="btn todo-cancel"
  onClick={() => setEditing(false)}
>
  Cancel
  <span className="visually-hidden">renaming {props.name}</span>
</button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  
  // (2)The "view" template, when we are just viewing a todo; this is what we’ve used in rest of the tutorial so far.
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            // use an anonymous function to call props.toggleTaskCompleted() with a parameter of props.id
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
        {/* setEditing() with a value of true when a user presses the "Edit" button in our viewTemplate, so that we can switch templates. */}
        <button type="button" className="btn" onClick={() => setEditing(true)}>
  Edit <span className="visually-hidden">{props.name}</span>
</button>
          <button
            type="button"
            className="btn btn__danger"
            // want to call props.deleteTask() when the "Delete" button is pressed. 
            // deleteTask() needs to know the ID of the task that called it, so it can delete the correct task from the state
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );
    return (
      // Conditional rendering:our condition is "Is this task being edited?" Change the return statement inside Todo()
        <li className="todo stack-small">{isEditing ? editingTemplate : viewTemplate}
        <div className="c-cb">
        <input
  id={props.id}
  type="checkbox"
  defaultChecked={props.completed}
  onChange={() => props.toggleTaskCompleted(props.id)}/>
  <label className="todo-label" htmlFor={props.id}>
          {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">Eat</span>
          </button>
          
          <button type="button" className="btn btn__danger" onClick={() => props.deleteTask(props.id)}>
  Delete <span className="visually-hidden">{props.name}</span>
</button>
        </div>
      </li>
      
      
    );
  }