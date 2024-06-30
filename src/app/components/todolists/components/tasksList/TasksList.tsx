import css from "../todolist/TodoList.module.css";
import {Task} from "../todolist/TodoList.tsx";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {TodoListType, TaskType} from "../../TodoLists.tsx";
import {ChangeTitle} from "../changeTitle/ChangeTitle.tsx";

export interface PropsType {
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
            const resultTasks = tasks.map((task) => task.id === id ? {...task, isDone: el.target.checked} : task)
            const resObj = {
                [todolistId]: resultTasks
            }
            return {...prevState, ...resObj}
        })
    }
    const onSaveTitleTask = (id:string, value: string, succsessCallbak: () => void) => {
        setTasks((prevState) => {
            const tasks:Task[] = prevState[todolistId]
            const newTasks= tasks.map(item => item.id===id?{...item,Task:value}:item)
            return {...prevState, ...{ [todolistId]:newTasks}}
        })
        succsessCallbak()
    }
    return (
        <ul className={css.tasks}>
            {filteredTasks.map((task) => (
                <li key={task.id} className={task.isDone ? css.isDone : undefined}>
                    <input
                        type={"checkbox"}
                        checked={task.isDone}
                        onChange={(event) => onChangeCheckBox(event, task.id)}
                    />
                    <ChangeTitle
                        title={task.titleTask}
                        saveTitle={(value)=> onSaveTitleTask(task.id, value, callback)}/>

                    <button>Edit</button>

                    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
                </li>))}
        </ul>
    )
}
