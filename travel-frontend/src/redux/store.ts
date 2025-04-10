import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./slices/customerSlice";
import bookingReducer from "./slices/bookingSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        customers: customerReducer,
        bookings: bookingReducer,
        auth: authReducer,
    },
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
