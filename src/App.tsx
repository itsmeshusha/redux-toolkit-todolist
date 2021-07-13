import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'Go to the beach', isDone: true},
        {id: v1(), title: 'Learn redux-toolkit', isDone: false},
        {id: v1(), title: 'Codewars', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    if(filter === 'active') {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }

  return (
    <div className="App">
      <Todolist title={'What to do?'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
      />

    </div>
  );
}

export default App;
