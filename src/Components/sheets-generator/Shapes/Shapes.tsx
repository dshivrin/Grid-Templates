import { useEffect, useRef } from "react";
import Canvas from "../Components/Canvas/Canvas";
import BasicTabs from "../Components/Tabs/Tabs";
import consts from "Utils/Consts.json";
import ShapesControls from "../Components/Control Panels/ShapesControls";
import { DrawFibonachiSpiral } from "Utils/scripts/Shapes";
import { useAppSelector } from "state/hooks";

const Shapes = () => {
  const scaleDown = consts.scaleDown;

  //canvas
  const displayCanvasElement = useRef<HTMLCanvasElement>(null);
  let ctxRef = null;
  //page:
  const height = useAppSelector((state) => state.canvas.height);
  const width = useAppSelector((state) => state.canvas.width);
  const pageSize = useAppSelector((state) => state.canvas.pageSize);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  const templateType = useAppSelector((state) => state.canvas.template);
  const pageOrientation = useAppSelector(
    (state) => state.canvas.pageOrientation
  );

  useEffect(() => {
    ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯
    if (!ctxRef) return;

    DrawFibonachiSpiral(ctxRef, width, height, lineWidth);
  }, []);

  const tabs = {
    "Fibonnachi spiral": <ShapesControls />,
  };

  return (
    <div className="main-container">
      <Canvas canvasRef={displayCanvasElement} />
      <BasicTabs tabs={tabs} />
    </div>
  );
};

export default Shapes;
