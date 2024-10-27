import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { TaskResponse } from '../type'
import { getMyTask } from "./getMyTasks.ts";
import { errorHandler } from "../../../shared/api/axiosinstance.ts";

interface DeleteTaskRequest {
  id: string
}

export const deleteTask = createAsyncThunk<void, DeleteTaskRequest>(
  'task/deleteTask',
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const { id } = params
      await apiInstance.delete<TaskResponse>(`/task/${id}`)
    dispatch(getMyTask())
    } catch (error) {
      return rejectWithValue(errorHandler(error))
    }
  }
)
