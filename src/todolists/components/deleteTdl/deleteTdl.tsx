import { useContext, useState } from 'react'
import { BaseButton, BaseModalWindow } from '../../../shared'
import { TaskType } from '../../../types'
import { TodolistContext } from '../../../app/provider'

interface PropsType {
  todolistId: string
}

export const DeleteTdl = ({ todolistId }: PropsType) => {
  const { setTodolists: setTodolists, setTasksObj: setTasks } = useContext(TodolistContext)
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
