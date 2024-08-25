import { v4 as uuidv4 } from 'uuid'
import { Dispatch, SetStateAction, useState } from 'react'
import { BaseButton, BaseInput } from '../../shared'
import { TaskType, TodoListType } from "../../types";

interface PropsType {
  setTodolists: Dispatch<SetStateAction<TodoListType[]>>
  setTasks: Dispatch<SetStateAction<TaskType>>
}

export const AddTodolist = ({ setTodolists, setTasks }: PropsType) => {
  const [value, setValue] = useState<string>('')

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
