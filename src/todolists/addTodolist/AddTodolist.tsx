import { useState } from 'react'
import { BaseButton, BaseInput } from '../../shared'
import { addTodolist } from "../../entity";
import { RootState, useAppDispatch } from "../../app/rootStore";
import { useSelector } from "react-redux";

export const AddTodolist = () => {
  const dispatch = useAppDispatch()
  const{isLoading} = useSelector((state:RootState) => state.todolistStore)
  const [value, setValue] = useState<string>('')
  const onClear =() => {
    setValue("")
  }
  const onClick =() => {
    if (value) {
      dispatch(addTodolist({ title: value, description: "", successCallback: onClear }))
    }
  }

  return (
    <div>
      <BaseInput
        disabled={isLoading}
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
