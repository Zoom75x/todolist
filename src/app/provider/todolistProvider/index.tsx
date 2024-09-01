import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Task, TaskType, TodoListType } from '../../../types'
import { initialTasks, initialTodoLists } from './data.ts'
import { v4 as uuidv4 } from 'uuid'

interface PropsContext {
  todoLists: TodoListType[]
  setTodolists: Dispatch<SetStateAction<TodoListType[]>>
  tasksObj: TaskType
  setTasksObj: Dispatch<SetStateAction<TaskType>>
  addTodolist: (titleTdl: string, succsessCallback: () => void) => void
  onSaveTitleTdl: (todolistId: string, value: string, onSuccessCallback: () => void) => void
  onSaveTitleTask: (
    todolistId: string,
    taskId: string,
    value: string,
    succsessCallback: () => void
  ) => void
  onDeleteTask: (taskId: string, todolistId: string) => void
  isCompletedTask: (checked: boolean, taskId: string, todolistId: string) => void
  onDeleteTodolist: (todolistId:string, callback: ()=> void) => void
  addTask : (value:string, todoListId:string, successCallback: ()=> void, errorCallback: ()=> void) =>void
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
  const onSaveTitleTdl = (todolistId: string,value: string, onSuccessCallback: () => void) => {
    setTodolists((prevState) => {
      const newArr = prevState.map((tdl) =>
        tdl.id === todolistId ? { ...tdl, title: value } : tdl
      )
      return newArr
    })
    onSuccessCallback()
  }
  const onSaveTitleTask = (todolistId:string, taskId: string, value: string, succsessCallback: () => void) => {
    setTasksObj((prevState) => {
      const tasks: Task[] = prevState[todolistId]
      const newTasks: Task[] = tasks.map((item) =>
        item.id === taskId ? { ...item, titleTask: value } : item
      )
      return { ...prevState, ...{ [todolistId]: newTasks } }
    })
    succsessCallback()
  }
  const onDeleteTask = (taskId: string, todolistId:string) => {
    setTasksObj((prevState) => {
      const targetTodolist = prevState[todolistId]
      const filteredTask = targetTodolist.filter((el) => el.id !== taskId)
      return { ...prevState, ...{ [todolistId]: filteredTask } }
    })
  }
  const isCompletedTask = (checked:boolean, taskId: string,todolistId:string) => {
    setTasksObj((prevState) => {
      const tasks = prevState[todolistId]
      const resultTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: checked } : task
      )
      const resObj = {
        [todolistId]: resultTasks,
      }
      return { ...prevState, ...resObj }
    })
  }
  const onDeleteTodolist = (todolistId:string, callback: ()=> void) => {
    setTasksObj((prevState) => {
      const newObjTask: TaskType = { ...prevState }
      delete newObjTask[todolistId]
      return newObjTask
    })
    setTodolists((prevState) => {
      return prevState.filter((tdl) => tdl.id !== todolistId)
    })
    callback()
  }
  const addTask = (value:string, todoListId:string, successCallback: ()=> void, errorCallback: ()=> void) => {
    if (value) {
      setTasksObj((prevState) => {
        const newTask: Task = {
          id: uuidv4(),
          titleTask: value,
          isDone: false,
          todolistId: todoListId,
        }
        const tasks = prevState[todoListId]
        const newTasks = [newTask, ...tasks]
        return { ...prevState, ...{ [todoListId]: newTasks } }
      })

      successCallback()
    } else {
      errorCallback()
    }
  }
  const getData = (): PropsContext => {
    return { todoLists, setTodolists, tasksObj, setTasksObj, addTodolist, onSaveTitleTdl,onSaveTitleTask, onDeleteTask,isCompletedTask, onDeleteTodolist, addTask }
  }
  return <TodolistContext.Provider value={getData()}>{children}</TodolistContext.Provider>
}
