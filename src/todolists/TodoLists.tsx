import { TodoList } from './components'
import { AddTodolist } from './addTodolist/AddTodolist.tsx'
import css from './TodoLists.module.css'
import { useContext, useEffect } from 'react'
import { TodolistContext } from '../app/provider'

export const TodoLists = () => {
  const { todoLists, getMyTodolist,  getMyTasks} = useContext(TodolistContext)
  useEffect(() => {
    getMyTodolist()
    getMyTasks()
  }, [])
  return (
    <div>
      <AddTodolist />
      <div className={css.container}>
        {todoLists.map((todolist) => {
          return (
            <TodoList key={todolist.id} titleToDoList={todolist.title} todolistId={todolist.id} />
          )
        })}
      </div>
    </div>
  )
}
