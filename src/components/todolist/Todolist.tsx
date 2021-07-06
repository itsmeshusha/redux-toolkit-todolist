import React from 'react'
import s from './Todolist.module.css'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

export const Todolist = (props: PropsType) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <input type={'text'}/>
            <button>Add</button>
            {props.tasks.map(el => <div key={el.id}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>{el.title}</span>
                <button onClick={() => props.removeTask(el.id)}>X</button>
            </div>)}
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    )
}