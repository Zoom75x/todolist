import {v4 as uuidv4} from "uuid";
import {TaskType, TodoListType} from "../TodoLists.tsx";
import {Dispatch, SetStateAction, useState} from "react";

interface PropsType{
    setTodolists: Dispatch<SetStateAction<TodoListType[]>>
    setTasks: Dispatch<SetStateAction<TaskType>>
}

export const AddTodolist = ({setTodolists, setTasks}:PropsType) => {
    const [value, setValue] = useState<string>("")

    const onClickAddTodolist = () => {
        const todolistId = uuidv4()
        const newTodolist: TodoListType = {
            id:todolistId, title:value
        }
        const newTask = {
            [todolistId]: []
        }
        setTodolists(prevState => [newTodolist, ...prevState])
        setTasks(prevState => {
            return {...prevState, ...newTask}
        })
        setValue("")
    }
    return <div>
        <input placeholder={"add new todo"}
               onChange={(event) => {
                   setValue(event.target.value)
               }}
               value={value}
        />
        <button onClick={onClickAddTodolist}>Add Todo</button>
    </div>
}