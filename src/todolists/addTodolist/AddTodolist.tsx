import { v4 as uuidv4 } from 'uuid'
import { useContext, useState } from 'react'
import { BaseButton, BaseInput } from '../../shared'
import { TodoListType } from '../../types'
import { TodolistContext } from '../../app/provider'

export const AddTodolist = () => {
  const [value, setValue] = useState<string>('')

  const { setTodolists, setTasksObj: setTasks } = useContext(TodolistContext)

  const onClickAddTodolist = () => {
    const todolistId = uuidv4()
    const newTodolist: TodoListType = {
      id: todolistId,
      title: value,
    }
    const newTask = {
      [todolistId]: [],
    }
    setTodolists((prevState) => [newTodolist, ...prevState])
    setTasks((prevState) => {
      return { ...prevState, ...newTask }
    })
    setValue('')
  }
  return (
    <div>
      <BaseInput
        placeholder={'add new todo'}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        value={value}
      />
      <BaseButton variant={'secondary'} onClick={onClickAddTodolist}>
        Add Todo
      </BaseButton>
    </div>
  )
}
