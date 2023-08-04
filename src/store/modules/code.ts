import { createSlice } from "@reduxjs/toolkit";
import { languageType } from "@/types";

interface codeStateType {
  code: {
    html: string;
    css: string;
    javascript: string;
  };
}

interface actionTypes {
  type: string;
  payload: {
    newCode: string;
    language: languageType;
  };
}

const initialState = {
  code: {
    html: "",
    css: "",
    javascript: "",
  },
} as codeStateType;

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    changeCode(state, action: actionTypes): void {
      const { payload } = action;

      const { newCode, language } = payload;
      state.code[language] = newCode;
    },
  },
  extraReducers: () => {},
});

export const { changeCode } = codeSlice.actions;

export default codeSlice.reducer;
