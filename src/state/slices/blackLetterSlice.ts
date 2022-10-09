import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blackLetterState } from "Utils/types";
import consts from "Utils/Consts.json";

const defaults = consts.defaultValues.BlackLetter;

const initialState: blackLetterState = {
  nibSize: defaults.nibSize,
};

const blackLetterSlice = createSlice({
  name: "blackLetter",
  initialState,
  reducers: {
    onNibSizeChanged(state, action: PayloadAction<number>) {
      state.nibSize = action.payload;
    },
  },
});

export const { onNibSizeChanged } = blackLetterSlice.actions;
export default blackLetterSlice.reducer;
