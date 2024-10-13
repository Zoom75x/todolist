import css from './TaskList.module.css'
import { useContext } from 'react'
import { ChangeTitle } from '../changeTitle/ChangeTitle.tsx'
import { BaseButton, BaseCheckbox } from '../../../shared'
import { TodolistContext } from '../../../app/provider'
import { TaskResponseDTO } from '../../../entity'
import { useAppDispatch } from '../../../app/rootStore'
import { updateTask } from '../../../entity/task/api/updateTask.ts'

export interface PropsType {
  filteredTasks: TaskResponseDTO[]
  todolistId: string
  disabled?: boolean
}

export const TasksList = ({ todolistId, filteredTasks }: PropsType) => {
  const { onDeleteTask } = useContext(TodolistContext)
  const dispatch = useAppDispatch()
  return (
    <ul className={css.tasks}>
      {filteredTasks?.map((task) => (
        <li key={task.id} className={task.isCompleted ? css.isDone : undefined}>
          <div className={css.container}>
            <BaseCheckbox
              checked={task.isCompleted}
              onChange={(event) => {
                dispatch(updateTask({isCompleted:event.target.checked, taskId: task.id }))
              }}
            />
            <ChangeTitle
              title={task.title}
              saveTitle={(value, successCallback) => {
                dispatch(updateTask({ title: value, taskId: task.id, successCallback }))
                //onSaveTitleTask(todolistId, task.id, value, successCallback)
              }}
              disabled={task.isCompleted}
            />
            <BaseButton
              onClick={() => onDeleteTask(task.id, todolistId)}
              disabled={task.isCompleted}
            >
              Delete
            </BaseButton>
          </div>
        </li>
      ))}
    </ul>
  )
}
