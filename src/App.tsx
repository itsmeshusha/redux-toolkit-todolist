import React from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";

function App() {
    const tasks1 = [
        {id: 1, title: 'Go to the beach', isDone: true},
        {id: 2, title: 'Learn redux-toolkit', isDone: false},
        {id: 3, title: 'Codewars', isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: 'Hello world', isDone: true},
        {id: 2, title: 'I am happy', isDone: true},
        {id: 3, title: 'Yo!', isDone: true}
    ]

  return (
    <div className="App">
      <Todolist title={'What to do?'} tasks={tasks1} />
      <Todolist title={'Hello world'} tasks={tasks2} />

    </div>
  );
}

export default App;
