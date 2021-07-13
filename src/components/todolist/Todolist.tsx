import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './Todolist.module.css'
import {FilterValuesType} from "../../App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            addTaskHandler()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <input type={'text'} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>Add</button>
            {props.tasks.map(el => {
                const onClickHandler = () => props.removeTask(el.id)
                
                return <div key={el.id}>
                    <input type={'checkbox'} checked={el.isDone}/>
                    <span>{el.title}</span>
                    <button onClick={onClickHandler}>X</button>
                </div>
                })
            }
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    )
}