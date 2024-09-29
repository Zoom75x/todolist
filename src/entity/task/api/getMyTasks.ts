import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { TaskResponse, TaskResponseDTO } from '../type'

const normalizedTask = (tasks: TaskResponse[]): TaskResponseDTO[] => {
  return tasks.map((task) => {
    const { is_completed, due_date, created_at, todolist_id, ...rest } = task
    return {
      ...rest,
      isCompleted: is_completed,
      dueDate: due_date,
      createdAt: created_at,
      todolistId: todolist_id,
    }
  })
}

export const getMyTask = createAsyncThunk<TaskResponseDTO[], void>('tasks/getMyTasks', async () => {
  const response = await apiInstance.get<TaskResponse[]>('/task')
  return normalizedTask(response.data)
})
