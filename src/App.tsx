import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: 'Go to the beach', isDone: true},
        {id: 2, title: 'Learn redux-toolkit', isDone: false},
        {id: 3, title: 'Codewars', isDone: false}
    ])
    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }
  return (
    <div className="App">
      <Todolist title={'What to do?'} tasks={tasks} removeTask={removeTask} />

    </div>
  );
}

export default App;
