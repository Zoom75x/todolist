import css from '../tasksList/TaskList.module.css'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { BaseButton, BaseInput } from '../../../shared'
import { useAppDispatch } from '../../../app/rootStore'
import { addTask } from '../../../entity'

interface PropsType {
  todoListId: string
}

export const AddTask = ({ todoListId }: PropsType) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value.trim())
  }
  const onFocus = () => {
    if (error) {
      setError(true)
    }
  }
  const onClickAddTask = () => {
    dispatch(
      addTask({
        value,
        todoListId,
        successCallback: () => setValue(''),
        errorCallback: () => setError(true),
      })
    )
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
