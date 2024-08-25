import { TodoList } from './components'
import { AddTodolist } from './addTodolist/AddTodolist.tsx'
import css from './TodoLists.module.css'
import { useContext } from 'react'
import { TodolistContext } from '../app/provider'

export const TodoLists = () => {
  const { tasks, setTasks, todoLists, setTodolists } = useContext(TodolistContext)
  return (
    <div>
      <AddTodolist setTodolists={setTodolists} setTasks={setTasks} />
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
            />
          )
        })}
      </div>
    </div>
  )
}
