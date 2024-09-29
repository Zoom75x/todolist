import { createSlice } from '@reduxjs/toolkit'
import { TodolistDTO } from '../type'
import { getMyTodolist } from '../api'

interface InitialState {
  todoLists: TodolistDTO[]
  isLoading: boolean
}

const initialState: InitialState = {
  todoLists: [],
  isLoading: false,
}
const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyTodolist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyTodolist.fulfilled, (state, action) => {
        state.todoLists = action.payload
        state.isLoading = false
      })
      .addCase(getMyTodolist.rejected,(state)=>{
        state.isLoading = false
      })
  },
})
export { todolistSlice }
