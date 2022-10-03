
import { useEffect, useRef, useState } from "react";
import { CovnertToPDF, PrintCanvas } from "../../Utils/Utils";
import { drawCopperplateGrid } from "../../Utils/Copperplate";
import consts from "../../Utils/Consts.json";
import Controls from "../Controls/Controls";
import "./Canvas.css";
import { PageSize } from "../../Utils/types";
import { drawBlackletterGrid } from "../../Utils/Blackletter";

import BasicTabs from '../Tabs/Tabs';

/*
  TODO:
  1. Add form validation for all inputs
  2. Printing and exporting PDF in landscape mode 
  3. Display canvas is not to scale
  5. useMemo 
  6. Add proper types
  7. Proper CSS, consider adding bootstrap before any changes
  8. Add punctuated lines in between to distinguish the main line and asc+desc, 
    divide the page to sections of 5 
*/

//print is usually 300 dpi
//A4 page size - 3508 x 2480 px (297 x 210 mm)
//A5 page size - 2480 x 1748 px (210 x 148 mm)
//A6 page size - 1748 x 1240 px (148 x 105 mm)
//1 cm = 37.7952755906

const Canvas = () => {
  const scaleDown = consts.scaleDown;
  const mm = consts.mm;
  const pageSizes: Array<PageSize> = consts.pageSizes;
  const defaultPage = pageSizes.find((p) => p.isDefault || p.size === "A4");

  // const [selectedPageSize, setSelectedPageSize] = useState(defaultPage!.size);
  // const [pageOrientation, setPageOrientation] = useState("p"); //
  // const [canvasWidth, setCanvasWidth] = useState(defaultPage!.width);
  // const [canvasHeight, setCanvasHeight] = useState(defaultPage!.height);

  // const [includeVerticalLines, setIncludeVerticalLines] = useState(true);
  // const [verticalAngle, setVerticalAngle] = useState(55); //state is not needed here as the angle is not expected to change
  // const [verticalSpacing, setVerticalSpacing] = useState(7);

  // const [includeHorizontalLines, setIncludeHorizontalLines] = useState(true);
  // const [horizontalSpacing, setHorizontalSpacing] = useState(5);

  // const [lineWidth, setLineWidth] = useState(1); //default is 1 px

  const displayCanvasElement = useRef<HTMLCanvasElement>(null);
  let ctxRef = null;

  // const onPageSizeChanged = (size: string) => {
  //   const page = pageSizes.find((p) => p.size === size);
  //   if (!page) return;

  //   if (pageOrientation === "p") {
  //     setCanvasWidth(page.width);
  //     setCanvasHeight(page.height);
  //   } else {
  //     setCanvasWidth(page.height);
  //     setCanvasHeight(page.width);
  //   }

  //   setSelectedPageSize(page.size);
  // };

  // const onOrientationChange = (mode: string) => {
  //   setPageOrientation(mode);
  //   const page = pageSizes.find((p) => p.size === selectedPageSize);
  //   if (!page) return;
  //   if (mode === "p") {
  //     setCanvasWidth(page.width);
  //     setCanvasHeight(page.height);
  //   } else {
  //     setCanvasWidth(page.height);
  //     setCanvasHeight(page.width);
  //   }
  // };

  useEffect(() => {
    ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯
    if (!ctxRef) return;
    let scale: number;
    let horizontal, vertical: number;

    const width = displayCanvasElement.current!.width
    const height = displayCanvasElement.current!.height

    if (height > width) {
      scale = height / width;
    } else {
      scale = width / height;
    }

    horizontal = mm * 5 * scale;
    vertical = mm * 7 * scale;
    //debugger;
    // drawCopperplateGrid(
    //   ctxRef,
    //   0,
    //   mm / scaleDown,
    //   verticalAngle,
    //   canvasWidth / scaleDown,
    //   canvasHeight / scaleDown,
    //   lineWidth / scaleDown,
    //   horizontal,
    //   vertical,
    //   includeHorizontalLines,
    //   includeVerticalLines
    // );
    drawBlackletterGrid(ctxRef, 2.4, width, height, 2.4*10, 1 );
  }, [
    
    mm, // <= mm is not expected to change, nevertheless React feels better when its here
  ]);

  // const controlsOptions = {
  //   includeVerticalLines,
  //   includeHorizontalLines,
  //   verticalAngle,
  //   verticalSpacing,
  //   horizontalSpacing,
  //   selectedPageSize,
  //   pageSizes,
  //   lineWidth,
  //   pageOrientation,
  //   setLineWidth,
  //   onOrientationChange,
  //   onPageSizeChanged,
  //   setIncludeVerticalLines,
  //   setIncludeHorizontalLines,
  //   setVerticalAngle,
  //   setVerticalSpacing,
  //   setHorizontalSpacing,
  //   PrintCanvas,
  //   CovnertToPDF,
  // };

  return (
    <div className="main-container">
      <div className="section canvas-container">
        <canvas
          id="canvas"
          width={2480 / scaleDown}
          height={3508 / scaleDown}
          ref={displayCanvasElement}
        ></canvas>
      </div>
      <div className="controls-container">
        <Controls />
        {/* <BasicTabs/> */}
      </div>
    </div>
  );
};

export default Canvas;
