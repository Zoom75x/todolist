import { createSlice } from '@reduxjs/toolkit'
import { sigIn } from '../api'
import { authMe } from '../api'
import { ACCESS_TOKEN } from '../../../shared'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Иван',
    isAuthentificated: false,
    isLoading: false,
    isInitialised:false,
  },
  reducers: {
    logOut(state) {
      localStorage.removeItem(ACCESS_TOKEN)
      state.isAuthentificated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sigIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(authMe.fulfilled, (state) => {
        state.isAuthentificated = true
        state.isLoading = false
        state.isInitialised=true
      })
      .addCase(authMe.rejected, (state) => {
        state.isLoading = false
        state.isInitialised=true
      })
      .addCase(sigIn.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export { userSlice }
export const { logOut } = userSlice.actions
