import { useContext, useState } from 'react'
import { BaseButton, BaseInput } from '../../shared'
import { TodolistContext } from '../../app/provider'

export const AddTodolist = () => {
  const [value, setValue] = useState<string>('')
  const { addTodolist } = useContext(TodolistContext)
  const onClear =() => {
    setValue("")
  }
  const onClick =() => {
    addTodolist(value, onClear)
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
      <BaseButton variant={'secondary'} onClick={onClick}>
        Add Todo
      </BaseButton>
    </div>
  )
}
