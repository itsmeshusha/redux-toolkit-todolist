import React from 'react'
import s from './Todolist.module.css'
import {FilterValuesType} from "../../App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (filter: FilterValuesType) => void
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
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    )
}