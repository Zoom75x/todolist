import { FilterBlock } from '../filterBlock/FilterBlock.tsx'
import { AddTask } from '../addTask/AddTask.tsx'
import { TasksList } from '../tasksList/TasksList.tsx'
import { useContext, useState } from 'react'
import { ChangeTitle } from '../changeTitle/ChangeTitle.tsx'
import css from './TodoList.module.css'
import { DeleteTdl } from '../deleteTdl/deleteTdl.tsx'
import { Task } from '../../../types'
import { TodolistContext } from '../../../app/provider'

interface PropsType {
  titleToDoList: string
  todolistId: string
}

export type FilterStateType = 'All' | 'Active' | 'Completed'
export const TodoList = ({ titleToDoList, todolistId }: PropsType) => {
  const { tasksObj, onSaveTitleTdl } = useContext(TodolistContext)
  const tasks = tasksObj[todolistId]
  const [filterState, setFilterState] = useState<FilterStateType>('All')
  let filterTask: Task[] = []

  if (filterState === 'All') {
    filterTask = tasks
  } else if (filterState === 'Active') {
    filterTask = tasks.filter((task) => !task.isDone)
  } else if (filterState === 'Completed') {
    filterTask = tasks.filter((task) => task.isDone)
  }

  return (
    <div className={css.container}>
      <div>
        <h3>{titleToDoList}</h3>
      </div>
      <ChangeTitle title={titleToDoList} saveTitle={(value, callback)=> {onSaveTitleTdl(todolistId, value, callback)}}/>
      <DeleteTdl todolistId={todolistId} />
      <AddTask todoListId={todolistId} />
      <TasksList filteredTasks={filterTask} todolistId={todolistId} />
      <FilterBlock filterState={filterState} setFilterState={setFilterState} />
    </div>
  )
}
