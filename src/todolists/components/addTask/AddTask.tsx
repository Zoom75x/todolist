import css from '../tasksList/TaskList.module.css'
import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react'
import { BaseButton, BaseInput } from '../../../shared'
import { TodolistContext } from '../../../app/provider'

interface PropsType {
  todoListId: string
}

export const AddTask = ({ todoListId }: PropsType) => {
  const { addTask } = useContext(TodolistContext)
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
  const onClickAddTask = () => {
    addTask(
      value,
      todoListId,
       ()=> setValue(""),
      ()=> setError(true))
  }
  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onClickAddTask()
    } else if (event.code === 'Escape') {
      setValue('')
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
      <BaseButton onClick={onClickAddTask}>Add task</BaseButton>
    </div>
  )
}
