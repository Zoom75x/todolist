import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState:{
    name: "Иван",
  },
  reducers:{}
})

export {userSlice}