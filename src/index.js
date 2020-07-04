import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


// Tasks as data:pass DATA to <App /> as a prop, called tasks.
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];
ReactDOM.render(
  <React.StrictMode>
  {/* array is now available to the App component as props.tasks. */}
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
