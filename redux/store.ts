import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import { authApi } from "./services/authApi";
import { userApi } from "./services/userApi";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({}).concat(authApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
