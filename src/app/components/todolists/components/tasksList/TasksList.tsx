import css from "../todolist/TodoList.module.css";
import {TasksType} from "../todolist/TodoList.tsx";
import {ChangeEvent} from "react";

export interface Props {
    setTasks: (tasks: TasksType[]) => void
    tasks: TasksType[]
    filteredTasks: TasksType[]
}
export const TasksList = ({setTasks, tasks, filteredTasks}:Props) => {
    const onDeleteTask = (id: string) => {
        const newArr = [...tasks]
        const filteredTasks = newArr.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }
    const onChangeCheckBox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        const newArray = [...tasks]
        const changeTask = newArray.find(task => task.id === id)
        if (changeTask) {
            changeTask.isDone = event.target.checked
            const newTasks = newArray.map(task => task.id == id ? changeTask : task)
            setTasks(newTasks)
        }
    }
    return (
    <ul className={css.tasks}>
        {filteredTasks.map(({id, titleTask, isDone}) => (
            /*const{id, titleTask, isDone} = el*/
            <li key={id} className={isDone ? css.isDone : ""}>

                <input type={"checkbox"}
                       checked={isDone}
                       onChange={(event) => onChangeCheckBox(event, id)}/>{titleTask}

                <button>Edit</button>

                <button onClick={() => onDeleteTask(id)}>Delete</button>
            </li>))}
    </ul>
        )
}
