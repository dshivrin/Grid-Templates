import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export type ControlsProps = {
  includeVerticalLines: boolean;
  includeHorizontalLines: boolean;
  verticalAngle: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  selectedPageSize: string;
  pageSizes: Array<PageSize>;
  lineWidth: number;
  pageOrientation: string;
  setLineWidth: (width: number) => void;
  onOrientationChange: (mode: string) => void;
  onPageSizeChanged: (size: string) => void;
  setIncludeVerticalLines: (p: boolean) => void;
  setIncludeHorizontalLines: (p: boolean) => void;
  setVerticalAngle: (size: number) => void;
  setVerticalSpacing: (size: number) => void;
  setHorizontalSpacing: (size: number) => void;
  PrintCanvas: (
    pageSize: string,
    lineWidth: number,
    horizontaleInterval: number,
    verticaleInterval: number,
    drawHorizontal: boolean,
    drawVertical: boolean,
    pageOrientation: string
  ) => void;
  CovnertToPDF: (
    pageSize: string,
    lineWidth: number,
    horizontaleInterval: number,
    verticaleInterval: number,
    drawHorizontal: boolean,
    drawVertical: boolean
  ) => void;
};

export type PageSize = {
  size: string;
  width: number;
  height: number;
  isDefault: boolean;
};

export type TabsProps = {
  ctxRef: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
};

export type pageSizes = "A4" | "A5" | "A6";
export type templateType = "CopperPlate" | "BlackLetter";

export type canvasState = {
  width: number;
  height: number;
  pageSize: pageSizes;
  pageOrientation: string;
  lineWidth: number;
  template: templateType;
};

export type coperPlateState = {
  angle: number;
  width: number;
  height: number;
  lineWidth: number;
  horizontalInterval: number;
  verticaleInterval: number;
  drawHorizontal: boolean;
  drawVertical: boolean;
};

export type blackLetterState = {
  nibSize: number;
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
