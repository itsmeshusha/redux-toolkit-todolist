import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./AddItemForm.module.css"

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required!")
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.code === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div>
            <div className={s.addTaskContainer}>
                <span className={s.addTaskItem}>
                    <input className={error ? s.error : s.input}
                           value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                    />
                </span>
                <span className={s.addTaskItem}>
                    <button className={s.button} onClick={addItemHandler}>Add Task</button>
                </span>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>

    )
}