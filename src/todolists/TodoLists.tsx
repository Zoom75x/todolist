import { TodoList } from './components'
import { AddTodolist } from './addTodolist/AddTodolist.tsx'
import css from './TodoLists.module.css'
import { useEffect } from 'react'
import { RootState, useAppDispatch } from '../app/rootStore'
import { getMyTodolist } from '../entity/todolist'
import { useSelector } from 'react-redux'
import { getMyTask } from '../entity'

export const TodoLists = () => {
  const { todoLists } = useSelector((state: RootState) => state.todolistStore)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMyTodolist())
    dispatch(getMyTask())
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
