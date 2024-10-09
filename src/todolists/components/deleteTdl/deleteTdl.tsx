import { useState } from 'react'
import { BaseButton, BaseModalWindow } from '../../../shared'
import { useAppDispatch } from '../../../app/rootStore'
import { deleteTodolist } from "../../../entity/todolist/api/deleteTodolist.ts";

interface PropsType {
  todolistId: string
}

export const DeleteTdl = ({ todolistId }: PropsType) => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <BaseButton onClick={() => setIsOpen(true)}>Delete</BaseButton>
      {isOpen && (
        <BaseModalWindow
          onCancel={() => setIsOpen(false)}
          onOk={() => dispatch(deleteTodolist({todolistId, successCallback:() => setIsOpen(false)}))}
        >
          <div>Вы хотите удалить?</div>
        </BaseModalWindow>
      )}
    </>
  )
}
