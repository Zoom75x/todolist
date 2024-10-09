import { createSlice } from '@reduxjs/toolkit'
import { TodolistDTO } from '../type'
import { addTodolist, getMyTodolist } from '../api'
import { changeTodolist } from "../api/changeTodolist.ts";

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
        state.todoLists = action.payload.sort((a, b) => {
          console.log(
            a.createdAt,
            new Date(a.createdAt),
            new Date(a.createdAt).getTime(),
            '////////'
          )
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        })
        state.isLoading = false
      })
      .addCase(getMyTodolist.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addTodolist.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.todoLists.unshift(action.payload)
        state.isLoading = false
      })
      .addCase(addTodolist.rejected, (state) => {
        state.isLoading = false
      }).addCase(changeTodolist.pending, (state) => {
      state.isLoading = true
    })
      .addCase(changeTodolist.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(changeTodolist.rejected, (state) => {
        state.isLoading = false
      })
  },
})
export { todolistSlice }
