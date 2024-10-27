import { createAsyncThunk } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, apiInstance } from '../../../shared'
import { SigInResponce, SigInRequest } from '../type'
import { authMe } from './autMe.ts'
import { errorHandler } from '../../../shared/api/axiosinstance.ts'

export const sigIn = createAsyncThunk<SigInResponce, SigInRequest, {}>(
  'users/sigIn',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiInstance.post<SigInResponce>('/users/login', params)
      localStorage.setItem(ACCESS_TOKEN, response.data.access_token)
      dispatch(authMe())
      return response.data
    } catch (error) {
      return rejectWithValue(errorHandler(error))
    }
  }
)
