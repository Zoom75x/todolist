import { configureStore } from '@reduxjs/toolkit'
import { taskSlice, todolistSlice, userSlice } from "../../entity";
import { useDispatch } from 'react-redux'


export const rootStore = configureStore({
  reducer: {
    userStore: userSlice.reducer,
    todolistStore: todolistSlice.reducer,
    taskStore:taskSlice.reducer
  },
})

export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
