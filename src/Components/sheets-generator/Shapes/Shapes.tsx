import { useEffect, useRef } from "react";
import Canvas from "../Components/Canvas/Canvas";
import BasicTabs from "../Components/Tabs/Tabs";
import consts from "Utils/Consts.json";
import ShapesControls from "../Components/Control Panels/ShapesControls";

const Shapes = () => {
    const scaleDown = consts.scaleDown;

  //canvas
  const displayCanvasElement = useRef<HTMLCanvasElement>(null);
  let ctxRef = null;


  
  useEffect(() => {
    ctxRef = displayCanvasElement.current!.getContext("2d"); // forced (!) due to some strange useRef behaviour with useEffect ¯\_(ツ)_/¯
    if (!ctxRef) return;

    //init(ctxRef);
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

}

export default Shapes;