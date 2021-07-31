import React, {ChangeEvent, useState} from 'react'
import s from './EditableSpan.module.css';

type PropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input className={s.input} value={title} autoFocus onChange={changeTitle} onBlur={activateViewMode} />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}