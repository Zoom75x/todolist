import './App.css'
import {Rating} from "./feature/rating/Rating.tsx";
import {Todolist} from "./feature/todolist/Todolist.tsx";
import {Task} from "./feature/todolist/Todolist.tsx";
import {useState} from "react";

const tasks: Task[] = [
    {id: 1, task: "Хлеб", isDone: true},
    {id: 2, task: "Молоко", isDone: true},
    {id: 3, task: "Сыр", isDone: false},
    {id: 4, task: "Мясо", isDone: true},
    {id: 5, task: "Вино", isDone: false}
]
export type setFilterStateType = "All" | "Active" | "Closed"
export const App = () => {
    const [filterState, setFilterState] = useState<setFilterStateType>("All")
    let filterTask:Task[] = []
    if (filterState === "All") {
        filterTask = tasks
    } else if (filterState === "Active") {
        filterTask = tasks.filter(task => !task.isDone)
    } else if (filterState === "Closed") {
        filterTask = tasks.filter(task => task.isDone)
    }
    return (
        <>
                <h2>Рейтинг</h2>
                <Rating/>
                <h2>Todolist</h2>
                <Todolist title={"Список покупок"} tasks={filterTask} setFilterState={setFilterState}/>
        </>
    )
}
