import { useAppSelector } from "state/hooks";
import { CanvasProps } from "Utils/types";
import consts from "Utils/Consts.json";
import "./Canvas.css";

const Canvas = (props: CanvasProps) => {
  const { canvasRef } = props;
  const width = useAppSelector((state) => state.canvas.width);
  const height = useAppSelector((state) => state.canvas.height);
  const scaleDown = consts.scaleDown;

  return (
    <div className="section canvas-container">
      <canvas
        id="canvas"
        width={width / scaleDown}
        height={height / scaleDown}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default Canvas;
