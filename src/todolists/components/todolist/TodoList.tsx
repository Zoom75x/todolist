import { FilterBlock } from '../filterBlock/FilterBlock.tsx'
import { AddTask } from '../addTask/AddTask.tsx'
import { TasksList } from '../tasksList/TasksList.tsx'
import { useState } from 'react'
import { ChangeTitle } from '../changeTitle/ChangeTitle.tsx'
import css from './TodoList.module.css'
import { DeleteTdl } from '../deleteTdl/deleteTdl.tsx'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/rootStore'
import { TaskResponseDTO } from '../../../entity'
import { changeTodolist } from '../../../entity/todolist/api/changeTodolist.ts'

interface PropsType {
  titleToDoList: string
  todolistId: string
}

export type FilterStateType = 'All' | 'Active' | 'Completed'
export const TodoList = ({ titleToDoList, todolistId }: PropsType) => {
  const dispatch = useAppDispatch()
  const { taskObj: tasksObj } = useSelector((state: RootState) => state.taskStore)
  const tasks = tasksObj[todolistId]
  const [filterState, setFilterState] = useState<FilterStateType>('All')
  let filterTask: TaskResponseDTO[] = []

  if (filterState === 'All') {
    filterTask = tasks
  } else if (filterState === 'Active') {
    filterTask = tasks.filter((task) => !task.isCompleted)
  } else if (filterState === 'Completed') {
    filterTask = tasks.filter((task) => task.isCompleted)
  }

  return (
    <div className={css.container}>
      <div>
        <h3>{titleToDoList}</h3>
      </div>
      <ChangeTitle
        title={titleToDoList}
        saveTitle={(value, callback) => {
          dispatch(changeTodolist({ todolistId, title: value, successCallback: callback }))
        }}
      />
      <DeleteTdl todolistId={todolistId} />
      <AddTask todoListId={todolistId} />
      <TasksList filteredTasks={filterTask} todolistId={todolistId} />
      <FilterBlock filterState={filterState} setFilterState={setFilterState} />
    </div>
  )
}
