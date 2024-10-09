import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { TodolistDTO, TodolistRequest, TodolistResponse } from '../type'

const normalizedData = (data: TodolistResponse): TodolistDTO => {
  const { created_at, user_id, ...rest } = data
  return { createdAt: created_at, userId: user_id, ...rest }
}

interface CommonFunctions {
  successCallback?: () => void
  todolistId: string
}

export const changeTodolist = createAsyncThunk<
  TodolistDTO,
  Partial<TodolistRequest> & CommonFunctions
>('todolist/changeTodolist', async ({ successCallback, todolistId, ...data }, thunkApi) => {
  try {
    const response = await apiInstance.patch<TodolistResponse>(`todolist/${todolistId}`, data)
    successCallback?.()
    return normalizedData(response.data)
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})
