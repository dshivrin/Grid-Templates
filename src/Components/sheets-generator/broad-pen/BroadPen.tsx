import { useEffect, useRef } from "react";
import consts from "Utils/Consts.json";
import { drawBlackletterGrid } from "Utils/scripts/Blackletter";
import { useAppSelector } from "state/hooks";
import Canvas from "../Components/Canvas/Canvas";
import BasicTabs from "../Components/Tabs/Tabs";
import BlackLetterControls from "../Components/Control Panels/blackLetterControls";

/*
  TODO:
  1. Add form validation for all inputs
  2. Printing and exporting PDF in landscape mode 
  7. Proper CSS, consider adding bootstrap before any changes
  8. In copperPlate add punctuated lines in between to distinguish the main line and asc+desc, 
    divide the page to sections of 5  
*/

//print is usually 300 dpi
//A4 page size - 3508 x 2480 px (297 x 210 mm)
//A5 page size - 2480 x 1748 px (210 x 148 mm)
//A6 page size - 1748 x 1240 px (148 x 105 mm)
//1 cm = 37.7952755906

const BroadPen = () => {
  const scaleDown = consts.scaleDown;

  //page:
  const height = useAppSelector((state) => state.canvas.height);
  const width = useAppSelector((state) => state.canvas.width);
  const pageSize = useAppSelector((state) => state.canvas.pageSize);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  const templateType = useAppSelector((state) => state.canvas.template);
  const pageOrientation = useAppSelector(
    (state) => state.canvas.pageOrientation
  );

  //copperplate
  const includeVerticalLines = useAppSelector(
    (state) => state.copperplate.drawVertical
  );
  const includeHorizontalLines = useAppSelector(
    (state) => state.copperplate.drawHorizontal
  );
  const verticalAngle = useAppSelector((state) => state.copperplate.angle);
  const verticalInterval = useAppSelector(
    (state) => state.copperplate.verticaleInterval
  );
  const horizontalInterval = useAppSelector(
    (state) => state.copperplate.horizontalInterval
  );

  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);

  //local
  const displayCanvasElement = useRef<HTMLCanvasElement>(null);
  let ctxRef = null;

  useEffect(() => {
    ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯
    if (!ctxRef) return;

    drawBlackLetterTemplate(ctxRef);
  }, [
    templateType,
    pageOrientation,
    pageSize,
    lineWidth,
    includeVerticalLines,
    includeHorizontalLines,
    verticalInterval,
    horizontalInterval,
    nibSize,
  ]);

  const drawBlackLetterTemplate = (ctxRef: CanvasRenderingContext2D) => {
    drawBlackletterGrid(
      ctxRef,
      nibSize * 2.5,//scale issue, same in print
      width / scaleDown,
      height / scaleDown,
      nibSize * 15,
      lineWidth
    );
  };

  const tabs = {
    "Blackletter": <BlackLetterControls />,
    "Hebrew": <BlackLetterControls />,
    "Custom": <BlackLetterControls />,
  };

  return (
    <div className="main-container">
      <Canvas canvasRef={displayCanvasElement} />
      <BasicTabs tabs={tabs} />
    </div>
  );
};

export default BroadPen;
