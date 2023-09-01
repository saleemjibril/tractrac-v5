import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import { saveLoginInfo, userLogout } from "./authActions";

// initialize userToken from local storage
const userToken = secureLocalStorage.getItem("xak")
  ? secureLocalStorage.getItem("xak")
  : null;
  
const hasProfile = secureLocalStorage.getItem("xad") !== "undefined";
const profileInfo = hasProfile
  ? JSON.parse(secureLocalStorage.getItem("xad") as string)
  : null;

const initialState = {
  loading: false,
  profileInfo,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // builder.addCase(userLogin.pending, (state, { payload }) => {
    //   state.loading = true;
    //   state.error = null;
    // });

    builder.addCase(saveLoginInfo.fulfilled, (state, { payload }) => {
      // console.log("d", payload);
      state.loading = false;
      state.profileInfo = payload.user;
      state.userToken = payload.token;
      console.log("d",  state.profileInfo, '->', payload.user);

    });

    // builder.addCase(userLogin.rejected, (state, { payload }) => {
    //   console.log("err", payload);
    //   state.loading = false;
    //   state.error = payload;
    // });
    // logout user reducer...
    builder.addCase(userLogout.fulfilled, (state) => {
      state.profileInfo = null;
      state.userToken = null;
    });
  },
  //   extraReducers: {
  //     // login user
  //     [userLogin.pending]: (state) => {
  //       state.loading = true
  //       state.error = null
  //     },
  //     [userLogin.fulfilled]: (state, { payload }) => {
  //       console.log('d', payload)
  //       state.loading = false
  //       state.profileInfo = payload.data
  //       state.userToken = payload.token.token
  //     },
  //     [userLogin.rejected]: (state, { payload }) => {
  //       console.log('err', payload)
  //       state.loading = false
  //       state.error = payload
  //     },
  //     // logout user reducer...
  //     [adminLogOut.fulfilled]: (state) => {
  //       state.profileInfo = null
  //       state.userToken = null
  //     },
  //   },
});
export default authSlice.reducer;
