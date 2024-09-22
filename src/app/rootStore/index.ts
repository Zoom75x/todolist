import {configureStore} from "@reduxjs/toolkit"
import { userSlice } from "../../entity";
export const rootStore = configureStore({
  reducer:{
    userStore:userSlice.reducer,
  }
})

export type RootState = ReturnType<typeof rootStore.getState>
export type AppDispatch = typeof rootStore.dispatch