import {FilterBlock} from "../filterBlock/FilterBlock.tsx";
import {AddTask} from "../addTask/AddTask.tsx";
import {TasksList} from "../tasksList/TasksList.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {TodoListType} from "../../TodoLists.tsx";
import {ChangeTitle} from "../changeTitle/ChangeTitle.tsx";

export interface Task {
    id: string
    titleTask: string
    isDone: boolean
    todolistId: string
}

interface PropsType {
    titleToDoList: string
    tasks: Task[]
    setTasks: Dispatch<SetStateAction<TodoListType[]>>
    todoListId: string
    setTodolists: Dispatch<SetStateAction<TodoListType[]>>
}

export type FilterStateType = "All" | "Active" | "Completed"
export const TodoList = ({tasks, titleToDoList, setTasks, todoListId, setTodolists}: PropsType) => {
    const [filterState, setFilterState] = useState<FilterStateType>("All")
    let filterTask: Task[] = [];

    if (filterState === "All") {
        filterTask = tasks
    } else if (filterState === "Active") {
        filterTask = tasks.filter((task) => !task.isDone)
    } else if (filterState === "Completed") {
        filterTask = tasks.filter((task) => task.isDone)
    }
    return <>
        <div><h3>{titleToDoList}</h3></div>
        <ChangeTitle
            title={titleToDoList}
            todoListId={todoListId}
            setTodolists={setTodolists}/>
        <AddTask tasks={filterTask} setTasks={setTasks} todoListId={todoListId}/>
        <TasksList setTasks={setTasks} filteredTasks={tasks} todoListId={todoListId}/>
        <FilterBlock filterState={filterState} setFilterState={setFilterState}/>
    </>
}