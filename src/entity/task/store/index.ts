import { createSlice } from '@reduxjs/toolkit'
import { TaskResponseDTO } from '../type'
import { addTask, getMyTask } from '../api'
import { updateTask } from '../api/updateTask.ts'

export interface TaskType {
  [key: string]: TaskResponseDTO[]
}

interface InitialStateType {
  tasks: TaskResponseDTO[]
  isLoading: boolean
  taskObj: TaskType
}

const initialState: InitialStateType = {
  tasks: [],
  isLoading: false,
  taskObj: {},
}
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyTask.fulfilled, (state, action) => {
        state.tasks = action.payload
        const taskObj: TaskType = {}
        action.payload.forEach((el) => {
          if (taskObj[el.todolistId]) {
            taskObj[el.todolistId] = [...taskObj[el.todolistId], el].sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
          } else {
            taskObj[el.todolistId] = [el].sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            })
          }
        })
        state.taskObj = taskObj
        state.isLoading = false
      })
      .addCase(getMyTask.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const taskObj = { ...state.taskObj }
        if (taskObj[action.payload.todolistId]) {
          taskObj[action.payload.todolistId] = [
            action.payload,
            ...taskObj[action.payload.todolistId],
          ]
        } else {
          taskObj[action.payload.todolistId] = [action.payload]
        }
        state.taskObj = taskObj
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const taskObj = { ...state.taskObj }
        if (taskObj[action.payload.todolistId]) {
          taskObj[action.payload.todolistId] = [
            action.payload,
            ...taskObj[action.payload.todolistId].filter((el) => el.id !== action.payload.id),
          ].sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
        }
        state.taskObj = taskObj
      })
  },
})
