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
    changeStatus: (id: string, isDone: boolean) => void
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if(title.trim() !== '') {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>Add</button>
            {error && <div className={'error-message'}>{error}</div>}
            {props.tasks.map(el => {
                const onClickHandler = () => props.removeTask(el.id)
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(el.id, e.currentTarget.checked)
                }

                return <div key={el.id}>
                    <input type={'checkbox'} checked={el.isDone} onChange={onChangeStatusHandler}/>
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