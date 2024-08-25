import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { TaskType, TodoListType } from '../../../types'
import { initialTasks, initialTodoLists } from './data.ts'

interface PropsContext {
  todoLists: TodoListType[]
  setTodolists: Dispatch<SetStateAction<TodoListType[]>>
  tasks: TaskType
  setTasks: Dispatch<SetStateAction<TaskType>>
}

interface PropsType {
  children: ReactNode
}

export const TodolistContext = createContext<PropsContext>({} as PropsContext)
export const TodolistProvider = ({ children }: PropsType) => {
  const [todoLists, setTodolists] = useState<TodoListType[]>(initialTodoLists)
  const [tasks, setTasks] = useState<TaskType>(initialTasks)
  const getData = (): PropsContext => {
    return { todoLists, setTodolists, tasks, setTasks }
  }
  return <TodolistContext.Provider value={getData()}>{children}</TodolistContext.Provider>
}
