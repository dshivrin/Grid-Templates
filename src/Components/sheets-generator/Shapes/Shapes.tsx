import { RefObject, useEffect, useRef } from "react";
import Canvas from "../Components/Canvas/Canvas";
import BasicTabs from "../Components/Tabs/Tabs";
import ShapesControls from "../Components/Control Panels/ShapesControls";
import { DrawFibonachiSpiral } from "Utils/scripts/Shapes";
import { useAppSelector } from "state/hooks";

const Shapes = () => {

  //See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572
  const displayCanvasElement = useRef<HTMLCanvasElement>() as RefObject<HTMLCanvasElement>;
  //page:
  const height = useAppSelector((state) => state.canvas.height);
  const width = useAppSelector((state) => state.canvas.width);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);

  useEffect(() => {
   let ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯

    DrawFibonachiSpiral(ctxRef, width, height, lineWidth);
  }, [
    width,
    height,
    lineWidth
  ]);

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
