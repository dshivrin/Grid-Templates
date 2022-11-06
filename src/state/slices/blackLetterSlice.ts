import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blackLetterState } from "Utils/types";
import consts from "Utils/Consts.json";

const defaults = consts.defaultValues.BlackLetter;

const initialState: blackLetterState = {
  nibSize: defaults.nibSize,
  marginTop: defaults.marginTop,
  bodySize: defaults.bodySize,
  trailingSize: defaults.trailingSize,
  lineSpacing: defaults.lineSpacing,
  drawAccender: defaults.drawAccender,
  drawDescender: defaults.drawDescender,
};

const blackLetterSlice = createSlice({
  name: "blackLetter",
  initialState,
  reducers: {
    onNibSizeChanged(state, action: PayloadAction<number>) {
      state.nibSize = action.payload;
    },
    onMarginTopChanged(state, action: PayloadAction<number>) {
      state.marginTop = action.payload;
    },
    onBodySizeChanged(state, action: PayloadAction<number>) {
      state.bodySize = action.payload;
    },
    onTrailingSizeChanged(state, action: PayloadAction<number>) {
      state.trailingSize = action.payload;
    },
    onLineSpacingChanged(state, action: PayloadAction<number>) {
      state.lineSpacing = action.payload;
    },
    onDrawAccenderChanged(state, action: PayloadAction<boolean>) {
      state.drawAccender = action.payload;
    },
    onDrawDescenderChanged(state, action: PayloadAction<boolean>) {
      state.drawDescender = action.payload;
    },
  },
});

export const {
  onNibSizeChanged,
  onMarginTopChanged,
  onBodySizeChanged,
  onTrailingSizeChanged,
  onLineSpacingChanged,
  onDrawAccenderChanged,
  onDrawDescenderChanged
} = blackLetterSlice.actions;
export default blackLetterSlice.reducer;
