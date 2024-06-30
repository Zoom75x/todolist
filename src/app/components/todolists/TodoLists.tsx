import {TodoList} from "./components"
import {Task} from "./components/todolist/TodoList.tsx";
import {useState} from "react";
import {v4 as uuidv4} from "uuid"
import {AddTodolist} from "./addTodolist/AddTodolist.tsx";
import css from "./TodoLists.module.css"

export interface TodoListType {
    id: string
    title: string
}

export interface TaskType {
    [key: string]: Task[]
}

const todolistId1 = uuidv4()
const todolistId2 = uuidv4()

const initialTodoLists: TodoListType[] = [
    {id: todolistId1, title: "Лист1"},
    {id: todolistId2, title: "Лист2"}
]

const initialTasks: TaskType = {
    [todolistId1]: [
        {id: uuidv4(), titleTask: "Хлеб", isDone: true, todolistId: todolistId1},
        {id: uuidv4(), titleTask: "Молоко", isDone: false, todolistId: todolistId1},
        {id: uuidv4(), titleTask: "Мясо", isDone: true, todolistId: todolistId1}
    ],
    [todolistId2]: [
        {id: uuidv4(), titleTask: "Яйца", isDone: true, todolistId: todolistId2},
        {id: uuidv4(), titleTask: "Овощи", isDone: false, todolistId: todolistId2},
        {id: uuidv4(), titleTask: "Фрукты", isDone: false, todolistId: todolistId2}
    ]
}
export const TodoLists = () => {
    const [todoLists, setTodolists] = useState<TodoListType[]>(initialTodoLists)
    const [tasks, setTasks] = useState<TaskType>(initialTasks)


    return <div>
        <AddTodolist setTodolists={setTodolists} setTasks={setTasks}/>
        <div className={css.container}>
            {todoLists.map((todolist) => {
                return (
                    <TodoList
                        key={todolist.id}
                        titleToDoList={todolist.title}
                        tasks={tasks[todolist.id]}
                        setTasks={setTasks}
                        todolistId={todolist.id}
                        setTodolists={setTodolists}
                    />)
            })}
        </div>
    </div>
}