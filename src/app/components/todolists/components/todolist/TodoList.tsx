import {filterStateType} from "../../TodoLists.tsx";
import {v4 as uuidv4} from "uuid"
import {ChangeEvent, useState, KeyboardEvent} from "react";
import css from "./TodoList.module.css"

export interface TasksType {
    id: number
    titleTask: string
    isDone: boolean
}

export interface PropsType {
    titleToDoList: string
    tasks: TasksType[]
    setFilterState: (filterState: filterStateType) => void
    filterState: filterStateType
    setTasks: (tasks: TasksType[]) => void
}

const setColor = (filterState: filterStateType, state: filterStateType) => {
    return {background: filterState === state ? "red" : ""}
}

export const TodoList = ({titleToDoList, tasks, setFilterState, filterState, setTasks}: PropsType) => {
    const [value, setValue] = useState<string>("")
    const [error, setError] = useState<string>("")
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
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value.trim())
    }
    const onFocus = () => {
        if (error) {
            setError(false)
        }
    }
    const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            addTask()
        } else (event.code === "Escape")
        {
            setValue("")
        }
    }
    const onDeleteTask = (id: string) => {
        const newArr = [...tasks]
        const filteredTasks = newArr.filter(task=> task.id !== id)
        setTasks(filteredTasks)
    }
    const onChangeCheckBox = (el:ChangeEvent<HTMLInputElement>, id:string) =>{
            const newArray = [...tasks]
            const changeTask = newArray.find(task => task.id === id)
            if (changeTask) {
                changeTask.isDone=el.target.checked
                const newTasks = newArray.map(el =>task.id==id? changeTask:el)
                setTasks(newTasks)
            }
    }
    return (
        <>
            <div><h3>{titleToDoList}</h3></div>
            <input className={error ? css.error : undefined}
                   type={"text"} value={value}
                   onChange={onChange}
                   onFocus={onFocus}
                   onKeyUp={onKeyUp}/>
            <button onClick={addTask}>Add task</button>
            <ul className={css.tasks}>
                {tasks.map(({id, titleTask, isDone}) => (
                    /*const{id, titleTask, isDone} = el*/
                    <li key={id} className={isDone ? css.isDone: ""}>
                        <input type={"checkbox"}
                               checked={isDone}
                               onChange={(event) => onChangeCheckBox(event,id)}/>{titleTask}
                        <button>Edit</button>
                        <button onClick={()=> onDeleteTask(id)}>Delete</button>
                    </li>))}
            </ul>
            <div>
                <button style={setColor(filterState, "All")} onClick={() => {
                    setFilterState('All')
                }}>All
                </button>
                <button style={setColor(filterState, "Active")}
                        onClick={() => setFilterState("Active")}>Active
                </button>
                <button style={setColor(filterState, "Completed")}
                        onClick={() => setFilterState("Completed")}>Completed
                </button>
            </div>
        </>
    )
}