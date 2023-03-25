import { RefObject, useEffect, useRef } from "react";
import { drawCopperplateGrid } from "Utils/scripts/Copperplate";
import consts from "Utils/Consts.json";
import { useAppSelector } from "state/hooks";
import Canvas from "../Components/Canvas/Canvas";
import BasicTabs from "../Components/Tabs/Tabs";
import CopperPlateControls from "../Components/Control Panels/copperPlateControls";
import BlackLetterControls from "../Components/Control Panels/blackLetterControls";
import { drawBlackletterGrid } from "Utils/scripts/Blackletter";

//print is usually 300 dpi
//A4 page size - 3508 x 2480 px (297 x 210 mm)
//A5 page size - 2480 x 1748 px (210 x 148 mm)
//A6 page size - 1748 x 1240 px (148 x 105 mm)
//1 cm = 37.7952755906

const Calligraphy = () => {
  const scaleDown = consts.scaleDown;
  const mm = consts.mm;

  //page:
  const height = useAppSelector((state) => state.canvas.height);
  const width = useAppSelector((state) => state.canvas.width);
  const pageSize = useAppSelector((state) => state.canvas.pageSize);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  const templateType = useAppSelector((state) => state.canvas.template);
  const pageOrientation = useAppSelector(
    (state) => state.canvas.pageOrientation
  );

  //pointed nib
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

  //broad nib
  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);
  const marginTop = useAppSelector((state) => state.blackLetter.marginTop);
  const bodySize = useAppSelector((state) => state.blackLetter.bodySize);
  const lineSpacing = useAppSelector((state) => state.blackLetter.lineSpacing);
  const trailingSize = useAppSelector(
    (state) => state.blackLetter.trailingSize
  );
  const drawNibs = useAppSelector((state) => state.blackLetter.drawNibs);
  const drawAccender = useAppSelector(
    (state) => state.blackLetter.drawAccender
  );
  const drawDescender = useAppSelector(
    (state) => state.blackLetter.drawDescender
  );

  //See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572
  const displayCanvasElement = useRef<HTMLCanvasElement>() as RefObject<HTMLCanvasElement>;

  useEffect(() => {
    let ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯

    const drawCopperPlateTemplate = (ctxRef: CanvasRenderingContext2D ) => {
      let horizontal = mm * horizontalInterval;
      let vertical = mm * verticalInterval;
  
      drawCopperplateGrid(
        ctxRef,
        0,
        mm / scaleDown,
        verticalAngle,
        width / scaleDown,
        height / scaleDown,
        lineWidth / scaleDown,
        horizontal,
        vertical,
        includeHorizontalLines,
        includeVerticalLines
      );
    };
  
    const drawBlackLetterTemplate = (ctxRef: CanvasRenderingContext2D) => {
      drawBlackletterGrid(
        ctxRef,
        nibSize * 2.5, //scale issue, same in print
        width / scaleDown,
        height / scaleDown,
        marginTop,
        bodySize,
        trailingSize,
        lineWidth,
        lineSpacing,
        drawNibs,
        drawAccender,
        drawDescender
      );
    };

    const init = (ctxRef: CanvasRenderingContext2D | null) => {
      if(!ctxRef) return;
      switch (templateType) {
        case "Broad Nib":
          drawBlackLetterTemplate(ctxRef);
          break;
        case "Pointed Nib":
          drawCopperPlateTemplate(ctxRef);
          break;
      }
    };
    init(ctxRef);
  }, [
    templateType,
    pageOrientation,
    pageSize,
    lineWidth,
    includeVerticalLines,
    includeHorizontalLines,
    verticalInterval,
    horizontalInterval,
    verticalAngle,
    height,
    width,
    mm, 
    nibSize, 
    scaleDown,
    //
    marginTop,
    bodySize,
    lineSpacing,
    trailingSize,
    drawNibs,
    drawAccender,
    drawDescender,
  ]);

  const tabs = {
    "Pointed Nib": <CopperPlateControls />,
    "Broad Nib": <BlackLetterControls />,
  };

  return (
    <div className="main-container">
      <Canvas canvasRef={displayCanvasElement} />
      <BasicTabs tabs={tabs} />
    </div>
  );
};

export default Calligraphy;
