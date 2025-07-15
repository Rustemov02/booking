import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  name: string;
  surname: string;
  gender: "man" | "woman";
}

const initialState: CounterState = {
  name: "",
  surname: "",
  gender: "man",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});



export default userSlice.reducer;
