import css from "../todolist/TodoList.module.css";
import {v4 as uuidv4} from "uuid";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {TasksType} from "../todolist/TodoList.tsx";

interface Props {
    setTasks: (tasks: TasksType[]) => void
    tasks: TasksType[]
}

export const AddTask = ({tasks, setTasks}: Props) => {
    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(value, e.currentTarget.value)
        setValue(e.currentTarget.value.trim())
    }
    const onFocus = () => {
        if (error) {
            setError(true)
        }
    }
    const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            addTask()
        } else if (event.code === "Escape") {
            setValue("")
        }
    }
    const addTask = () => {
        if (value) {
            const newArrTask = [...tasks]
            newArrTask.push({id: uuidv4(), titleTask: value, isDone: false})
            setTasks(newArrTask)
            setValue("")
        } else {
            setError(true)
        }
    }
    return (
        <div>
            <input className={error ? css.error : undefined}
                   type={"text"}
                   value={value}
                   onChange={onChange}
                   onFocus={onFocus}
                   onKeyUp={onKeyUp}
            />
            <button onClick={addTask}>Add task</button>
        </div>
    )
}