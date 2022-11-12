import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export type CanvasProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

//index signature
export type TabsProps = {
  tabs: { [name: string]: JSX.Element };
};

export type pageSizes = "A4" | "A5" | "A6";
export type templateType = "Pointed Nib" | "Broad Nib";
export type pointedTemplateTypes = templateType | "CopperPlate" | "Modern";
export type broadTemplateTypes = templateType ;

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
  marginTop: number,
  bodySize: number,
  trailingSize: number,//ascender + descender size
  lineSpacing: number,
  drawNibs: boolean,
  drawAccender: boolean,
  drawDescender: boolean
};

export type PageSize = {
  size: string;
  width: number;
  height: number;
  isDefault: boolean;
};

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}



