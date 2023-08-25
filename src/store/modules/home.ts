import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface HomeTypes {
  previewSwitch: boolean;

  previewUrl: string;
}

const initialState = {
  previewSwitch: true,

  previewUrl: "https://github.com/xun082",
} as HomeTypes;

const codeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changePreviewSwitch(state, action: PayloadAction<boolean>): void {
      const { payload } = action;

      state.previewSwitch = payload;
    },

    changePreviewUrl(state, action: PayloadAction<string>): void {
      const { payload } = action;

      state.previewUrl = payload;
    },
  },
  extraReducers: () => {},
});

export const { changePreviewSwitch, changePreviewUrl } = codeSlice.actions;

export default codeSlice.reducer;
