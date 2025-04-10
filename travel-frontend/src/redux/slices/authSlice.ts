/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: any | null;
}

const savedAuth = localStorage.getItem("auth");
const initialState: AuthState = savedAuth
    ? JSON.parse(savedAuth)
    : {
        isAuthenticated: false,
        token: null,
        user: null,
    };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;

            localStorage.setItem("auth", JSON.stringify(state));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;

            localStorage.removeItem("auth");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
