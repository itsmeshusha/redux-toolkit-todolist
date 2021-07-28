import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: 'Go to the beach', isDone: true},
        {id: v1(), title: 'Learn redux-toolkit', isDone: false},
        {id: v1(), title: 'Codewars', isDone: false}
    ])

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(el => el.id === todolistId)
        if(todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }
    const changeStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(el => el.id === id)
        if(task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to do?', filter: 'all'},
        {id: v1(), title: 'What to buy?', filter: 'all'}
    ])

  return (
    <div className="App">
        {todolists.map(el => {
            let tasksForTodolist = tasks

            if(el.filter === 'active') {
                tasksForTodolist = tasks.filter(el => !el.isDone)
            }
            if(el.filter === 'completed') {
                tasksForTodolist = tasks.filter(el => el.isDone)
            }

            return <Todolist title={el.title}
                             key={el.id}
                             id={el.id}
                             tasks={tasksForTodolist}
                             removeTask={removeTask}
                             changeFilter={changeFilter}
                             filter={el.filter}
                             addTask={addTask}
                             changeStatus={changeStatus}
            />
        })}
    </div>
  );
}

export default App;
