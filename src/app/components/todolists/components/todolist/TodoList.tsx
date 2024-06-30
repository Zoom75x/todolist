import {FilterBlock} from "../filterBlock/FilterBlock.tsx";
import {AddTask} from "../addTask/AddTask.tsx";
import {TasksList} from "../tasksList/TasksList.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {TodoListType, TaskType} from "../../TodoLists.tsx";
import {ChangeTitle} from "../changeTitle/ChangeTitle.tsx";
import css from "./TodoList.module.css"
export interface Task {
    id: string
    titleTask: string
    isDone: boolean
    todolistId: string
}

interface PropsType {
    titleToDoList: string
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<TaskType>>
    todolistId: string
    setTodolists: Dispatch<SetStateAction<TodoListType[]>>
}

export type FilterStateType = "All" | "Active" | "Completed"
export const TodoList = ({tasks, titleToDoList, setTasks, todolistId, setTodolists}: PropsType) => {
    const [filterState, setFilterState] = useState<FilterStateType>("All")
    let filterTask: Task[] = [];

    if (filterState === "All") {
        filterTask = tasks
    } else if (filterState === "Active") {
        filterTask = tasks.filter((task) => !task.isDone)
    } else if (filterState === "Completed") {
        filterTask = tasks.filter((task) => task.isDone)
    }
    const onSaveTitleTdl = (value: string, onSuccessCallback: () => void) => {
        setTodolists(prevState => {
            const newArr = prevState.map((tdl) => tdl.id === todolistId ? {...tdl, title: value} : tdl)
            return newArr
        })
        onSuccessCallback()
    }
    return <div className={css.container}>
        <div><h3>{titleToDoList}</h3></div>
        <ChangeTitle
            title={titleToDoList}
            saveTitle={onSaveTitleTdl}
        />
        <AddTask tasks={filterTask} setTasks={setTasks} todoListId={todolistId}/>
        <TasksList setTasks={setTasks} filteredTasks={filterTask} todolistId={todolistId}/>
        <FilterBlock filterState={filterState} setFilterState={setFilterState}/>
    </div>
}