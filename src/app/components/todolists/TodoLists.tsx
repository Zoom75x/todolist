import {TodoList} from "./components"
import {TasksType} from "./components/todolist/TodoList.tsx";
import {useState} from "react";
import {v4 as uuidv4} from "uuid"

const initialTask: TasksType[] = [
    {id: uuidv4(), titleTask: "Хлеб", isDone: true},     /*task это один элемент в массивеб который мы используем как el в методах работы с массивами map и filter*/
    {id: uuidv4(), titleTask: "Молоко", isDone: false},  /*это одна task в массиве*/
    {id: uuidv4(), titleTask: "Мясо", isDone: true},     /*это одна task в массиве*/
    {id: uuidv4(), titleTask: "Яйца", isDone: true},     /*это одна task в массиве*/
    {id: uuidv4(), titleTask: "Овощи", isDone: false}    /*это одна task в массиве*/
]
export type filterStateType = "All" | "Active" | "Completed"
export const TodoLists = () => {
    const [tasks, setTasks] = useState<TasksType[]>(initialTask)
    const [filterState, setFilterState] = useState<filterStateType>("All")
    let filterTask: TasksType[] = []

    if (filterState === "All") {
        filterTask = tasks
    } else if (filterState === "Active") {
        filterTask = tasks.filter((task) => !task.isDone)
    } else if (filterState === "Completed") {
        filterTask = tasks.filter((task) => task.isDone)
    }
    return (
        <>
            <TodoList
                titleToDoList={"Список продуктов"}
                tasks={filterTask}
                setFilterState={setFilterState}
                filterState={filterState}
                setTasks={setTasks}/>
        </>
    )
}