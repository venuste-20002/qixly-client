import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface initSliceState {
  message: string;
}

export const initialState: initSliceState = {
  message: "welcome to Redux setup",
};

export const initSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setWelcomeState: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setAdd: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setWelcomeState } = initSlice.actions;
export const initReducer = initSlice.reducer;
