import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Task, TaskResponse, TaskType, TodoListType } from '../../../types'
import { ACCESS_TOKEN, BASE_URL } from '../../../shared'

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
  onDeleteTodolist: (todolistId: string, callback: () => void) => void
  addTask: (
    value: string,
    todoListId: string,
    successCallback: () => void,
    errorCallback: () => void
  ) => void
  getMyTodolist: () => void
  getMyTasks: () => void
}

interface PropsType {
  children: ReactNode
}

export const TodolistContext = createContext<PropsContext>({} as PropsContext)
export const TodolistProvider = ({ children }: PropsType) => {
  const [todoLists, setTodolists] = useState<TodoListType[]>([])
  const [tasksObj, setTasksObj] = useState<TaskType>({})

  const onSaveTitleTdl = (todolistId: string, value: string, onSuccessCallback: () => void) => {
    setTodolists((prevState) => {
      const newArr = prevState.map((tdl) =>
        tdl.id === todolistId ? { ...tdl, title: value } : tdl
      )
      return newArr
    })
    onSuccessCallback()
  }
  const onSaveTitleTask = (
    todolistId: string,
    taskId: string,
    value: string,
    succsessCallback: () => void
  ) => {
    setTasksObj((prevState) => {
      const tasks: Task[] = prevState[todolistId]
      const newTasks: Task[] = tasks.map((item) =>
        item.id === taskId ? { ...item, titleTask: value } : item
      )
      return { ...prevState, ...{ [todolistId]: newTasks } }
    })
    succsessCallback()
  }
  const onDeleteTask = (taskId: string, todolistId: string) => {
    setTasksObj((prevState) => {
      const targetTodolist = prevState[todolistId]
      const filteredTask = targetTodolist.filter((el) => el.id !== taskId)
      return { ...prevState, ...{ [todolistId]: filteredTask } }
    })
  }
  const isCompletedTask = (checked: boolean, taskId: string, todolistId: string) => {
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
  const onDeleteTodolist = (todolistId: string, callback: () => void) => {
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

  const getMyTodolist = async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    if (access_token) {
      const result = await fetch(`${BASE_URL}/todolist`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
      })
      if (result.ok) {
        const data: TodoListType[] = await result.json()
        setTodolists(data)
      } else {
        console.log('AuthErr')
      }
    }
  }
  const getMyTasks = async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    if (access_token) {
      const result = await fetch(`${BASE_URL}/task`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
      })
      if (result.ok) {
        const data: TaskResponse[] = await result.json()
        const convertTask = (tasks: TaskResponse[]): Task[] => {
          return tasks.map(
            (task): Task => ({
              id: task.id,
              titleTask: task.title,
              isDone: task.is_completed,
              todolistId: task.todolist_id,
              createdAt: task.created_at,
              description: task.description,
              dueDate: task.due_date,
            })
          )
        }
        const taskObj: TaskType = {}
        convertTask(data).forEach((el) => {
          if (taskObj[el.todolistId]) {
            console.log(taskObj[el.todolistId], el)
            taskObj[el.todolistId] = [...taskObj[el.todolistId], el]
          } else {
            taskObj[el.todolistId] = [el]
          }
        })
        setTasksObj(taskObj)
      } else {
        console.error('Autherr')
      }
    }
  }
  const addTask = async (
    value: string,
    todoListId: string,
    successCallback: () => void,
    errorCallback: () => void
  ) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    if (access_token) {
      const result = await fetch(`${BASE_URL}/task`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
        body: JSON.stringify({
          description: '',
          todolist_id: todoListId,
          title: value,
        }),
      })
      if (result.ok) {
        successCallback()
      } else {
        console.log('AuthErr')
        errorCallback()
      }
    }
  }
  const addTodolist = async (titleTdl: string, succsessCallback: () => void) => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    if (access_token) {
      const result = await fetch(`${BASE_URL}/todolist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` },
        body: JSON.stringify({
          title: titleTdl,
          description: '',
        }),
      })
      if (result.ok) {
        succsessCallback()
        getMyTodolist()
      } else {
        console.log('AuthErr')
      }
    }
  }
  const getData = (): PropsContext => {
    return {
      todoLists,
      setTodolists,
      tasksObj,
      setTasksObj,
      addTodolist,
      onSaveTitleTdl,
      onSaveTitleTask,
      onDeleteTask,
      isCompletedTask,
      onDeleteTodolist,
      addTask,
      getMyTodolist,
      getMyTasks,
    }
  }
  return <TodolistContext.Provider value={getData()}>{children}</TodolistContext.Provider>
}
