import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

//  addTask() function is giving each task the same id. This is bad for accessibility, and makes it impossible for React to tell future tasks apart with the key prop. In fact, React will give you a warning in your DevTools console — "Warning: Encountered two children with the same key..."
// We need to fix this. Making unique identifiers is a hard problem – one for which the JavaScript community has written some helpful libraries. We’ll use nanoid because it's tiny, and it works.
import { nanoid } from "nanoid";


function App(props) {
  // Adding a task
  function addTask(name) {
    const newTask = { id: "id", name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
// Tasks as state:want to pass props.tasks into the useState() hook – this will preserve its initial state.
  const [tasks, setTasks] = useState(props.tasks);

// set an isEditing state, the default state of which should be false.
// Adding a filter hook
  const [filter, setFilter] = useState('All');
  // let's add an object called FILTER_MAP:(A JavaScript object would be a great way to relate names to behaviors: each key is the name of a filter; each property is the behavior associated with that name.)
  const FILTER_MAP = {
    // The All filter shows all tasks, so we return true for all tasks.
    All: () => true,
    // The Active filter shows tasks whose completed prop is false.
    Active: task => !task.completed,
    // The Completed filter shows tasks whose completed prop is true.
    Completed: task => task.completed
  };
  //  Object.keys() method to collect an array of FILTER_NAMES:
  const FILTER_NAMES = Object.keys(FILTER_MAP);

  // create a constant called filterList, which we will use to map over our array of names and return a <FilterButton /> component.
  
  // To make our filter buttons interactive, we should consider what props they need to utilize.

// (1)<FilterButton /> should report whether it is currently pressed, and it should be pressed if its name matches the current value of our filter state.
// (2)<FilterButton /> needs a callback to set the active filter. We can make direct use of our setFilter hook
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
// deleteTask callback prop
// {deleteTask() is invoked correctly, we can call our setTasks() hook in deleteTask() to actually delete that task from the app’s state as well as visually in the app UI. 
// Since setTasks() expects an array as an argument, we should provide it with a new array that copies the existing tasks, excluding the task whose ID matches the one passed into deleteTask().
// This is a perfect opportunity to use Array.prototype.filter(). 
// We can test each task, and exclude a task from the new array if its id prop matches the id parameter passed into deleteTask().}
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  // Editing the name of a task
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  

  // Rendering with iteration:To render our array of objects
  // for transforming data into something else: Array.prototype.map().
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    // return a <Todo /> component from our map() function — 
    // remember that JSX allows us to mix up JavaScript and markup structures! 

      // can change our taskList mapping so that it is the result of mapping tasks, instead of props.tasks.
      //  Your taskList constant declaration should now look like so
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      
      // passing a key prop to our <Todo /> components. 
      // key is a special prop that's managed by React – you cannot use the word key for any other purpose.
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  // define an updatedTasks constant that maps over the original tasks array.  
  // If the task’s id property matches the id provided to the function, we use object spread syntax  to create a new object, and toggle the checked property of that object before returning it. 
  // If it doesn’t match, we return the original object.
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    // call setTasks() with this new array in order to update our state.
    setTasks(updatedTasks);
  }
  // except that if our list ever contains a single task, the heading will still use the word “tasks”. 
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';

  // counting the length of taskList and changing the text of our heading accordingly.
const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">

    {/* Callback props */}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      {/* Replace the three repeated <FilterButton />s in App.js with this filterList. */}
      {filterList}
      </div>
      {/* replace the list heading's text content with the headingText variable */}
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;