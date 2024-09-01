import { useContext, useState } from 'react'
import { BaseButton, BaseModalWindow } from '../../../shared'
import { TodolistContext } from '../../../app/provider'

interface PropsType {
  todolistId: string
}

export const DeleteTdl = ({ todolistId }: PropsType) => {
  const { onDeleteTodolist } = useContext(TodolistContext)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>Delete</BaseButton>
      {isOpen && (
        <BaseModalWindow onCancel={() => setIsOpen(false)} onOk={()=> onDeleteTodolist(todolistId, ()=>setIsOpen(false))}>
          <div>Вы хотите удалить?</div>
        </BaseModalWindow>
      )}
    </>
  )
}
