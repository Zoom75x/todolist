import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { SigInResponce } from '../type'
import { errorHandler, setAuthHeader } from '../../../shared/api/axiosinstance.ts'

export const authMe = createAsyncThunk<SigInResponce, void>(
  'users/authMe',
  async (_, { rejectedWithValue }) => {
    try {
      setAuthHeader()
      const response = await apiInstance.get<SigInResponce>('/users/me')
      return response.data
    } catch (error) {
      return rejectedWithValue(errorHandler(error))
    }
  }
)
