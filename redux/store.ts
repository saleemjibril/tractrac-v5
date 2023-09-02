import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/modalSlice";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import { authApi } from "./services/authApi";
import { userApi } from "./services/userApi";
import { tractorApi } from "./services/tractorApi";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tractorApi.reducerPath]: tractorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      authApi.middleware,
      userApi.middleware,
      tractorApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
