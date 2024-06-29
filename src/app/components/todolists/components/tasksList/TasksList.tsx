import css from "../todolist/TodoList.module.css";
import {Task} from "../todolist/TodoList.tsx";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {TodoListType} from "../../TodoLists.tsx";

export interface PropsType {
    title: string
    tasks: Task[]
    filteredTasks: Task[]
    setTasks: Dispatch<SetStateAction<TodoListType[]>>
    todolistId: string
}

export const TasksList = ({setTasks, todolistId, filteredTasks}: PropsType) => {
    const onDeleteTask = (id: string) => {
        setTasks((prevState) => {
            const targetTodolist = prevState[todolistId]
            //console.log("Таски искомого Тудулиста", todolistId, targetTodolist)

            const filteredTask = targetTodolist.filter((el) => el.id !== id)
            //console.log("Отфильтрованные таски(удалили ту, по которой кликнули)", filteredTask)

            //console.log("Готовый объект с тасками", {...prevState, ...{[todolistId]: filteredTask}})
            return {...prevState, ...{[todolistId]: filteredTask}}
        })
    }
    const onChangeCheckBox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        setTasks(prevState => {
            const tasks = prevState[todolistId]
            const resultTasks = tasks.map((task) => task.id === id ? {...task, isDone: el.target.checked}:task)
            const resObj = {
                [todolistId]: resultTasks
            }
            return {...prevState, ...resObj}
        })
    }
    return (
        <ul className={css.tasks}>
            {filteredTasks.map(({id, titleTask, isDone}) => (
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
