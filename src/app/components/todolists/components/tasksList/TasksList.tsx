import css from './TaskList.module.css'
import { Task } from '../todolist/TodoList.tsx'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { TaskType } from '../../TodoLists.tsx'
import { ChangeTitle } from '../changeTitle/ChangeTitle.tsx'
import { BaseButton, BaseCheckbox } from '../../../../../shared'

export interface PropsType {
  filteredTasks: Task[]
  setTasks: Dispatch<SetStateAction<TaskType>>
  todolistId: string
  disabled?: boolean
}
export const TasksList = ({ setTasks, todolistId, filteredTasks, disabled }: PropsType) => {
  const onDeleteTask = (id: string) => {
    setTasks((prevState) => {
      const targetTodolist = prevState[todolistId]
      const filteredTask = targetTodolist.filter((el) => el.id !== id)
      return { ...prevState, ...{ [todolistId]: filteredTask } }
    })
  }
  const onChangeCheckBox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    setTasks((prevState) => {
      const tasks = prevState[todolistId]
      const resultTasks = tasks.map((task) =>
        task.id === id ? { ...task, isDone: event.target.checked } : task
      )
      const resObj = {
        [todolistId]: resultTasks,
      }
      return { ...prevState, ...resObj }
    })
  }
  const onSaveTitleTask = (id: string, value: string, succsessCallback: () => void) => {
    setTasks((prevState) => {
      const tasks: Task[] = prevState[todolistId]
      const newTasks: Task[] = tasks.map((item) =>
        item.id === id ? { ...item, titleTask: value } : item
      )
      return { ...prevState, ...{ [todolistId]: newTasks } }
    })
    succsessCallback()
  }
  return (
    <ul className={css.tasks}>
      {filteredTasks.map((task) => (
        <li key={task.id} className={task.isDone ? css.isDone : undefined}>
          <div className={css.container}>
            <BaseCheckbox
              checked={task.isDone}
              onChange={(event) => onChangeCheckBox(event, task.id)}
            />
            <ChangeTitle
              title={task.titleTask}
              saveTitle={(value, callback) => onSaveTitleTask(task.id, value, callback)}
              disabled={task.isDone}
            />
            <BaseButton onClick={() => onDeleteTask(task.id)} disabled={task.isDone}>
              Delete
            </BaseButton>
          </div>
        </li>
      ))}
    </ul>
  )
}
