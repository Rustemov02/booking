import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userId: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
  roleName: string;
}

const initialAuthData = JSON.parse(
  localStorage.getItem("authState") ||
    sessionStorage.getItem("authState") ||
    "{}"
) || {
  userId: "",
  firstName: "",
  lastName: "",
  accessToken: "",
  refreshToken: "",
  roleName: "",
};

const emptyUser: UserState = {
  userId: "",
  firstName: "",
  lastName: "",
  accessToken: "",
  refreshToken: "",
  roleName: "",
};
const initialState: UserState = initialAuthData;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //named  reducers but exported as actions
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },

    logout: () => {
      localStorage.removeItem("authState");
      return emptyUser;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
