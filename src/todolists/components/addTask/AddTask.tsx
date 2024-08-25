import css from '../tasksList/TaskList.module.css'
import { v4 as uuidv4 } from 'uuid'
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react'
import { BaseButton, BaseInput } from '../../../shared'
import { Task } from '../../../types'
import { TodolistContext } from '../../../app/provider'

interface PropsType {
  todoListId: string
}

export const AddTask = ({ todoListId }: PropsType) => {
  const { setTasksObj: setTasks } = useContext(TodolistContext)
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(value, e.currentTarget.value)
    setValue(e.currentTarget.value.trim())
  }
  const onFocus = () => {
    if (error) {
      setError(true)
    }
  }
  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      addTask()
    } else if (event.code === 'Escape') {
      setValue('')
    }
  }
  const addTask = () => {
    if (value) {
      setTasks((prevState) => {
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

      setValue('')
    } else {
      setError(true)
    }
  }
  return (
    <div>
      <BaseInput
        className={error ? css.error : undefined}
        type={'text'}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
      />
      <BaseButton onClick={addTask}>Add task</BaseButton>
    </div>
  )
}
