import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { SigInResponce } from '../type'
import { errorHandler, setAuthHeader } from '../../../shared/api/axiosinstance.ts'

export const authMe = createAsyncThunk<void | SigInResponce, void>(
  'users/authMe',
  async (_, {rejectWithValue}) => {
    try {
      const token= setAuthHeader()
      if (!token) {
        return Promise.reject("Нет токена")
      }
      const response = await apiInstance.get<SigInResponce>('/users/me')
      return response.data
    } catch (error) {
      return rejectWithValue(errorHandler(error))
    }
  }
)
