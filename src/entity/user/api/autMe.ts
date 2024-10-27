import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { SigInResponce } from '../type'
import { errorHandler, setAuthHeader } from '../../../shared/api/axiosinstance.ts'

export const authMe = createAsyncThunk<SigInResponce, void>(
  'users/authMe',
  async (_, {rejectWithValue}) => {
    try {
      setAuthHeader()
      const response = await apiInstance.get<SigInResponce>('/users/me')
      return response.data
    } catch (error) {
      return rejectWithValue(errorHandler(error))
    }
  }
)
