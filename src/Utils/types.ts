
export type ControlsProps = {
  includeVerticalLines: boolean;
  includeHorizontalLines: boolean;
  verticalAngle: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  selectedPageSize: string;
  pageSizes: Array<PageSize>;
  lineWidth: number;
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
    drawVertical: boolean
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
  size: string,
  width: number,
  height: number,
  isDefault: boolean
}
