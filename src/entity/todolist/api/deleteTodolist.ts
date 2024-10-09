import { createAsyncThunk } from "@reduxjs/toolkit";
import { DeleteTodolistParams } from "../type";
import { apiInstance } from "../../../shared";
import { getMyTodolist } from "./getMyTodolist.ts";

interface CommonFunctions {
  successCallback: () => void
}
export const deleteTodolist = createAsyncThunk<void,DeleteTodolistParams & CommonFunctions>(
  "todolist/deleteTodolist",
  async ({todolistId, successCallback}, {rejectWithValue, dispatch}) => {
    try {
      await apiInstance.delete(`todolist/${todolistId}`)
      successCallback()
      dispatch(getMyTodolist())
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)