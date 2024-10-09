import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { TodolistDTO, TodolistRequest, TodolistResponse } from "../type";


const normalizedData = (data: TodolistResponse): TodolistDTO => {
  const { created_at, user_id, ...rest } = data
  return { createdAt: created_at, userId: user_id, ...rest }
}

interface CommonFunctions {
  successCallback?: () => void
}

export const addTodolist = createAsyncThunk<
  TodolistDTO,
  TodolistRequest & CommonFunctions
>('todolist/addTodolist', async ({ successCallback, ...data }, thunkApi) => {
  try {
    const response = await apiInstance.post<TodolistResponse>('todolist', data)
    successCallback?.()
    return normalizedData(response.data)
  } catch (e) {
    return thunkApi.rejectWithValue(e)
  }
})
