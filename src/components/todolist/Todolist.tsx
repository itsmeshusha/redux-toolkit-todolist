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
    id: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
}

export const Todolist = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if(title.trim() !== '') {
            props.addTask(title, props.id)
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
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <div>
                {props.title}
                <button onClick={() => props.removeTodolist(props.id)}>X</button>
            </div>
            <input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>Add</button>
            {error && <div className={'error-message'}>{error}</div>}
            {props.tasks.map(el => {
                const onClickHandler = () => props.removeTask(el.id, props.id)
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(el.id, e.currentTarget.checked, props.id)
                }

                return <div key={el.id} className={el.isDone ? 'is-done' : ''}>
                    <input type={'checkbox'} checked={el.isDone} onChange={onChangeStatusHandler}/>
                    <span>{el.title}</span>
                    <button onClick={onClickHandler}>X</button>
                </div>
                })
            }
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    )
}