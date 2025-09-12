import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  userId: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
  roleName: string;
}

const initialAuthData = JSON.parse(
  localStorage.getItem("authState") || "{}"
) || {
  userId: "",
  firstName: "",
  lastName: "",
  accessToken: "",
  refreshToken: "",
  roleName: "",
};

const initialState: CounterState = initialAuthData;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
