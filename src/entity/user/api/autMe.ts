import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiInstance } from '../../../shared'
import { SigInResponce } from '../type'
import { setAuthHeader } from '../../../shared/api/axiosinstance.ts'

export const authMe = createAsyncThunk<SigInResponce, void, {}>('users/authMe', async () => {
  setAuthHeader()
  const response = await apiInstance.get<SigInResponce>('/users/me')
  return response.data
})
