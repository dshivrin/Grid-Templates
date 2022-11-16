import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coperPlateState } from "Utils/types";
import consts from "Utils/Consts.json";

const defaults = consts.defaultValues.copperPlate;
const defaultPage = consts.pageSizes.find(
  (p) => p.isDefault || p.size === "A4"
);

const initialState: coperPlateState = {
  angle: defaults.angle,
  drawHorizontal: defaults.includeHorizontal,
  drawVertical: defaults.includeVertical,
  height: defaultPage!.height,
  width: defaultPage!.width,
  horizontalInterval: defaults.horizontalSpacing,
  verticaleInterval: defaults.verticalSpacing,
  lineWidth: defaults.lineWidth,
};

const copperplateSlice = createSlice({
  name: "copperplate",
  initialState,
  reducers: {
    onDrawHorizontal(state, action: PayloadAction<boolean>) {
      state.drawHorizontal = action.payload;
    },
    onDrawVertical(state, action: PayloadAction<boolean>) {
      state.drawVertical = action.payload;
    },
    onHorizontalInterval(state, action: PayloadAction<number>) {
      state.horizontalInterval = action.payload;
    },
    onverticaleInterval(state, action: PayloadAction<number>) {
      state.verticaleInterval = action.payload;
    },
    onVerticalAngle(state, action: PayloadAction<number>) {
      state.angle = action.payload;
    },
  },
});

export const {
  onDrawHorizontal,
  onDrawVertical,
  onHorizontalInterval,
  onverticaleInterval,
  onVerticalAngle
} = copperplateSlice.actions;
export default copperplateSlice.reducer;
