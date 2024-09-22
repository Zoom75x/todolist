import css from './TaskList.module.css'
import { useContext } from 'react'
import { ChangeTitle } from '../changeTitle/ChangeTitle.tsx'
import { BaseButton, BaseCheckbox } from '../../../shared'
import { TodolistContext } from '../../../app/provider'
import { Task } from '../../../types'

export interface PropsType {
  filteredTasks: Task[]
  todolistId: string
  disabled?: boolean
}

export const TasksList = ({ todolistId, filteredTasks }: PropsType) => {
  const { onSaveTitleTask, onDeleteTask, isCompletedTask } = useContext(TodolistContext)

  

  return (
    <ul className={css.tasks}>
      {filteredTasks?.map((task) => (
        <li key={task.id} className={task.isDone ? css.isDone : undefined}>
          <div className={css.container}>
            <BaseCheckbox
              checked={task.isDone}
              onChange={(event) => isCompletedTask(event.target.checked, task.id, todolistId)}
            />
            <ChangeTitle
              title={task.titleTask}
              saveTitle={( value, successCallback) =>
                onSaveTitleTask(todolistId, task.id, value, successCallback)}
              disabled={task.isDone}
            />
            <BaseButton onClick={() => onDeleteTask(task.id, todolistId)} disabled={task.isDone}>
              Delete
            </BaseButton>
          </div>
        </li>
      ))}
    </ul>
  )
}
