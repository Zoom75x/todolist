import { Dispatch, SetStateAction, useState } from 'react'
import { BaseButton, BaseModalWindow } from '../../../shared'
import { TaskType, TodoListType } from "../../../types";

interface PropsType {
  setTasks: Dispatch<SetStateAction<TaskType>>
  todolistId: string
  setTodolists: Dispatch<SetStateAction<TodoListType[]>>
}

export const DeleteTdl = ({ setTasks, todolistId, setTodolists }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onDeleteTodolist = () => {
    setTasks((prevState) => {
      const newObjTask: TaskType = { ...prevState }
      delete newObjTask[todolistId]
      return newObjTask
    })
    setTodolists((prevState) => {
      return prevState.filter((tdl) => tdl.id !== todolistId)
    })
    setIsOpen(false)
  }

  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>Delete</BaseButton>
      {isOpen && (
        <BaseModalWindow onCancel={() => setIsOpen(false)} onOk={onDeleteTodolist}>
          <div>Вы хотите удалить?</div>
        </BaseModalWindow>
      )}
    </>
  )
}
