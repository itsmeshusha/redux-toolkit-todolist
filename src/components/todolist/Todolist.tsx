import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './Todolist.module.css'
import {FilterValuesType} from "../../App";
import {RiDeleteBin2Line, TiDeleteOutline} from "react-icons/all";
import {AddItemForm} from "../AddItemForm/AddItemForm";

export type TaskType = {
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
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

    return (
        <div className={s.container}>
            <div className={s.titleContainer}>
                <span className={s.titleText}>{props.title}</span>
                <TiDeleteOutline size={25} onClick={() => props.removeTodolist(props.id)}/>
            </div>

            <AddItemForm addItem={addTask} />

            {props.tasks.map(el => {
                const onClickHandler = () => props.removeTask(el.id, props.id)
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(el.id, e.currentTarget.checked, props.id)
                }

                return <div key={el.id} className={el.isDone ? s.isDone : s.tasksContainer}>
                    <span className={s.taskItem}>
                        <input type={'checkbox'} checked={el.isDone} onChange={onChangeStatusHandler}/>
                    </span>
                    <span className={s.taskItem}>{el.title}</span>
                    <span className={s.taskItem}>
                       <RiDeleteBin2Line size={20} onClick={onClickHandler}/>
                    </span>
                </div>
            })
            }
            <div className={s.filters}>
                <span className={s.filterItem}>
                    <button className={props.filter === 'all' ? s.activeFilter : s.button}
                            onClick={onAllClickHandler}>All</button>
                </span>
                <span className={s.filterItem}>
                    <button className={props.filter === 'active' ? s.activeFilter : s.button}
                            onClick={onActiveClickHandler}>Active
                </button>
                </span>
                <span className={s.filterItem}>
                    <button className={props.filter === 'completed' ? s.activeFilter : s.button}
                            onClick={onCompletedClickHandler}>Completed
                </button>
                </span>
            </div>

        </div>
    )
}