import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { TaskResponse, TaskResponseDTO } from '../type'

interface AddTaskType {
  value: string
  todoListId: string
  successCallback: () => void
  errorCallback: () => void
}

export const addTask = createAsyncThunk<TaskResponseDTO, AddTaskType>(
  'tasks/addTask',
  async (params) => {
    const response = await apiInstance.post<TaskResponse>('/task', {
      description: '',
      todolist_id: params.todoListId,
      title: params.value,
    })
    params.successCallback()
    const {
      is_completed: isCompleted,
      todolist_id: todolistId,
      created_at: createdAt,
      due_date: dueDate,
      ...rest
    } = response.data
    return {
      isCompleted,
      createdAt,
      todolistId,
      dueDate,
      ...rest
    }
  }
)
