import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { canvasState, pageSizes, templateType } from "Utils/types";
import consts from "Utils/Consts.json";

//todo: display canvas size adjustment
const defaultPage = consts.pageSizes.find(
  (p) => p.isDefault || p.size === "A4"
);

//todo: use defaults
const initialState: canvasState = {
  height: defaultPage!.height,
  width: defaultPage!.width,
  pageOrientation: "p",
  pageSize: "A4",
  template: "CopperPlate",
  lineWidth: 1,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    onPageSizeChanged(state, action: PayloadAction<string>) {
      const selectedSize = action.payload;
      const selectedPage = consts.pageSizes.find(
        (p) => p.size === selectedSize
      );
      state.pageSize = selectedSize as pageSizes;
      setByPageorientation(state, state.pageOrientation, selectedPage);
    },
    onOrientationChanged(state, action: PayloadAction<string>) {
      console.log("orientation ", action.payload)
      const orientation = action.payload;
      const selectedPage = consts.pageSizes.find(
        (p) => p.size === state.pageSize
      );
      state.pageOrientation = orientation;
      setByPageorientation(state, orientation, selectedPage);
    },
    onTemplateChanged(state, action: PayloadAction<templateType>) {
      state.template = action.payload;
    },
    onLineWidthChange(state, action: PayloadAction<number>) {
      state.lineWidth = action.payload;
    },
  },
});

const setByPageorientation = (
  state: any,
  orientation: string,
  pageSize: any
) => {
  switch (orientation) {
    case "p":
      state.width = pageSize!.width;
      state.height = pageSize!.height;
      break;
    case "l":
      state.width = pageSize!.height;
      state.height = pageSize!.width;
      break;
    default:
      state.width = pageSize!.width;
      state.height = pageSize!.height;
      break;
  }
};

export const {
  onPageSizeChanged,
  onOrientationChanged,
  onTemplateChanged,
  onLineWidthChange,
} = canvasSlice.actions;
export default canvasSlice.reducer;
