import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { TaskResponse, TaskResponseDTO, TaskUpdateRequest } from '../type'

interface CommonData {
  taskId: string
  successCallback?: () => void
}

export const updateTask = createAsyncThunk<TaskResponseDTO, TaskUpdateRequest & CommonData>(
  'tasks/updateTask',
  async (params) => {
    const { taskId, successCallback, ...data } = params
    const {isCompleted:is_completed, title} = data
    const response = await apiInstance.patch<TaskResponse>(`/task/${taskId}`, {is_completed, title})
    const {
      is_completed: isCompleted,
      todolist_id: todolistId,
      created_at: createdAt,
      due_date: dueDate,
      ...rest
    } = response.data
    successCallback?.()
    return {
      isCompleted,
      createdAt,
      todolistId,
      dueDate,
      ...rest,
    }
  }
)
