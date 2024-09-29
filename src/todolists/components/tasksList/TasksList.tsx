import css from './TaskList.module.css'
import { useContext } from 'react'
import { ChangeTitle } from '../changeTitle/ChangeTitle.tsx'
import { BaseButton, BaseCheckbox } from '../../../shared'
import { TodolistContext } from '../../../app/provider'
import { TaskResponseDTO } from "../../../entity";

export interface PropsType {
  filteredTasks: TaskResponseDTO[]
  todolistId: string
  disabled?: boolean
}

export const TasksList = ({ todolistId, filteredTasks }: PropsType) => {
  const { onSaveTitleTask, onDeleteTask, isCompletedTask } = useContext(TodolistContext)

  

  return (
    <ul className={css.tasks}>
      {filteredTasks?.map((task) => (
        <li key={task.id} className={task.isCompleted ? css.isDone : undefined}>
          <div className={css.container}>
            <BaseCheckbox
              checked={task.isCompleted}
              onChange={(event) => isCompletedTask(event.target.checked, task.id, todolistId)}
            />
            <ChangeTitle
              title={task.title}
              saveTitle={( value, successCallback) =>
                onSaveTitleTask(todolistId, task.id, value, successCallback)}
              disabled={task.isCompleted}
            />
            <BaseButton onClick={() => onDeleteTask(task.id, todolistId)} disabled={task.isCompleted}>
              Delete
            </BaseButton>
          </div>
        </li>
      ))}
    </ul>
  )
}
