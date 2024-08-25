import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { TaskType, TodoListType } from '../../../types'
import { initialTasks, initialTodoLists } from './data.ts'
import { v4 as uuidv4 } from 'uuid'

interface PropsContext {
  todoLists: TodoListType[]
  setTodolists: Dispatch<SetStateAction<TodoListType[]>>
  tasksObj: TaskType
  setTasksObj: Dispatch<SetStateAction<TaskType>>
  addTodolist: (titleTdl: string, succsessCallback: () => void) => void
}

interface PropsType {
  children: ReactNode
}

export const TodolistContext = createContext<PropsContext>({} as PropsContext)
export const TodolistProvider = ({ children }: PropsType) => {
  const [todoLists, setTodolists] = useState<TodoListType[]>(initialTodoLists)
  const [tasksObj, setTasksObj] = useState<TaskType>(initialTasks)
  const addTodolist = (titleTdl:string, succsessCallback:() => void) => {
    const todolistId = uuidv4()
    const newTodolist: TodoListType = {
      id: todolistId,
      title: titleTdl,
    }
    const newTask = {
      [todolistId]: [],
    }
    setTodolists((prevState) => [newTodolist, ...prevState])
    setTasksObj((prevState) => {
      return { ...prevState, ...newTask }
    })
    succsessCallback()
    //setValue('')
  }
  const getData = (): PropsContext => {
    return { todoLists, setTodolists, tasksObj, setTasksObj, addTodolist }
  }
  return <TodolistContext.Provider value={getData()}>{children}</TodolistContext.Provider>
}
