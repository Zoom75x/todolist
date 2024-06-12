import {FilterBlock, filterStateType} from "../filterBlock/FilterBlock.tsx";
import {AddTask} from "../addTask/AddTask.tsx";
import {TasksList} from "../tasksList/TasksList.tsx";
import {useState} from "react";

export interface TasksType {
    id: string
    titleTask: string
    isDone: boolean
}
interface PropsType {
    titleToDoList: string
    tasks: TasksType[]
    setTasks: (tasks: TasksType[]) => void

}
export const TodoList = ({titleToDoList, tasks, setTasks}: PropsType) => {
    const [filterState, setFilterState] = useState<filterStateType>("All")

    let filterTask:TasksType[]=[];
    if (filterState === "All") {
        filterTask = tasks
    } else if (filterState === "Active") {
        filterTask = tasks.filter((task) => !task.isDone)
    } else if (filterState === "Completed") {
        filterTask = tasks.filter((task) => task.isDone)
    }
    return (
        <>
            <div><h3>{titleToDoList}</h3></div>
            <AddTask tasks={tasks} setTasks={setTasks}/>
            <TasksList setTasks={setTasks} tasks={tasks} filteredTasks={filterTask}/>
            <FilterBlock
                filterState={filterState}
                setFilterState={setFilterState}/>
        </>
    )
}