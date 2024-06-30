import css from "./TaskList.module.css";
import {Task} from "../todolist/TodoList.tsx";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {TaskType} from "../../TodoLists.tsx";
import {ChangeTitle} from "../changeTitle/ChangeTitle.tsx";
import {BaseButton} from "../../../../../shared";

export interface PropsType {
    filteredTasks: Task[]
    setTasks: Dispatch<SetStateAction<TaskType>>
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
            console.log("task", tasks)
            console.log(todolistId, "todolistId")
            const resultTasks = tasks.map((task) => task.id === id ? {...task, isDone: event.target.checked} : task)
            console.log(resultTasks, "resultTasks")
            const resObj = {
                [todolistId]: resultTasks
            }
            return {...prevState, ...resObj}
        })
    }
    const onSaveTitleTask = (id: string, value: string, succsessCallback: () => void) => {
        setTasks((prevState) => {
            const tasks: Task[] = prevState[todolistId]
            const newTasks = tasks.map(item => item.id === id ? {...item, Task: value} : item)
            return {...prevState, ...{[todolistId]: newTasks}}
        })
        succsessCallback()
    }
    return (
        <ul className={css.tasks}>
            {filteredTasks.map((task) => (
                <li key={task.id} className={task.isDone ? css.isDone : undefined}>
                    <div className={css.container}>
                        <input
                            type={"checkbox"}
                            checked={task.isDone}
                            onChange={(event) => onChangeCheckBox(event, task.id)}
                        />
                        <ChangeTitle
                            title={task.titleTask}
                            saveTitle={(value, callback) => onSaveTitleTask(task.id, value, callback)}/>
                        <BaseButton onClick={() => onDeleteTask(task.id)}>Delete</BaseButton>
                    </div>
                </li>))}
        </ul>
    )
}
