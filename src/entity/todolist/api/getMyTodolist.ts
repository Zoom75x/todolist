import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { TodolistDTO, TodolistResponse } from '../type'
import { errorHandler } from "../../../shared/api/axiosinstance.ts";

const normalizedTodolist = (todolists: TodolistResponse[]): TodolistDTO[] => {
  return todolists.map((tdl) => {
    const { user_id, created_at, ...rest } = tdl
    return { ...rest, userId: user_id, createdAt: created_at }
  })
}
export const getMyTodolist = createAsyncThunk<TodolistDTO[], void>(
  'todolist/getMyTodolist',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiInstance.get<TodolistResponse[]>('/todolist')
      console.log(normalizedTodolist(response.data))
      return normalizedTodolist(response.data)
    }
    catch (error) {
      return rejectWithValue(errorHandler(error))
    }
  }
  )
