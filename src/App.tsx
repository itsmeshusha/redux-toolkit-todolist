import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to do?', filter: 'all'},
        {id: todolistId2, title: 'What to buy?', filter: 'all'}
    ])
    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Go to the beach', isDone: true},
            {id: v1(), title: 'Learn redux-toolkit', isDone: false},
            {id: v1(), title: 'Codewars', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Eggs', isDone: false},
            {id: v1(), title: 'Salt', isDone: false}
        ]
    })

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(el => el.id !== id)
        setTasks({...tasks})
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }
    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(el => el.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let allTodolistTasks = tasks[el.id]
                let tasksForTodolist = allTodolistTasks

                if (el.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(el => !el.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.isDone)
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
                                 removeTodolist={removeTodolist}
                />
            })}
        </div>
    );
}

export default App;
