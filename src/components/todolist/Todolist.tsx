import React from 'react'
import s from './Todolist.module.css'

type PropsType = {
    title: string
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type={'text'}/>
            <button>Add</button>
            <div>
                <input type={'checkbox'} checked={true}/>
                <span>Go to the beach</span>
            </div>


        </div>
    )
}