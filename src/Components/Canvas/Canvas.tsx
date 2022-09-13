import React, { useEffect, useRef, useState } from "react";
import Controls from "../Controls/Controls";
import {
  clearCanvas,
  CovnertToPDF,
  drawLine,
  PrintCanvas,
  setLineSmoothness,
} from "../../Utils/Utils";
import "./Canvas.css";
import { drawCopperplateGrid } from "../../Utils/Copperplate";

//print is usually 300 dpi
//A4 page size - 3508 x 2480 px (297 x 210 mm)
//A5 page size - 2480 x 1748 px (210 x 148 mm)
//A6 page size - 1748 x 1240 px (148 x 105 mm)
//1 cm ~ 11.8px

const Canvas = (props: any) => {
  //starting with A4 size
  const scaleDown = 5;
  const width = 2480 / scaleDown;
  const height = 3508 / scaleDown;
  const mm = 111.8 / scaleDown;
  const lineWidth = mm; //default line width
  const lineheight = mm * 4; //default line height

  const [includeVerticaLines, setIncludeVerticaLines] = useState(true);
  const [verticalAngle, setVerticalAngle] = useState(55);
  const [verticalSpacing, setVerticalSpacing] = useState(5); //default is 5 cm

  //canvas
  const displayCanvasElement = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctxRef = displayCanvasElement.current!.getContext("2d");// 
    drawCopperplateGrid(ctxRef, 0, mm, 55, width, height, scaleDown, true);
  }, [drawCopperplateGrid]);

  //TODO: add form validation for the angle
  return (
    <div className="canvas-container">
      <canvas
        id="canvas"
        width={width}
        height={height}
        ref={displayCanvasElement}
      ></canvas>
      <div className="controls-wrapper">
        <div className="vertical-controls">
          <label>Vertical</label>
          <div>
            <label>Include Vertical lines? </label>
            <input
              type="checkbox"
              id="incluideVertical"
              checked={includeVerticaLines}
              onChange={() => {
                setIncludeVerticaLines(!includeVerticaLines);
              }}
            />
          </div>
          <div>
            <label>Vertical spacing in cm:</label>
            <input
              type="number"
              id="vertical-spacing"
              min="1"
              max="10"
              value={verticalSpacing}
              onChange={(event) => {
                setVerticalSpacing(+event.target.value);
              }}
              disabled={!includeVerticaLines}
            />
          </div>
          <div>
            <label>Vertical angle: </label>
            <input
              type="number"
              id="angle"
              min="50"
              max="60"
              value={verticalAngle}
              onChange={(event) => {
                setVerticalAngle(+event.target.value);
              }}
              disabled={!includeVerticaLines}
            />
          </div>
        </div>
        <div className="horizontal-controls">
          <label>Horizontal</label>
          <div>
            <div>
              <label>Include Vertical lines? </label>
              <input type="checkbox" id="incluideHorizontal" value="true" />
            </div>
            <div>
              <label>Horizontal spacing :</label>
              <input type="number" id="horizontal-spacing" min="1" max="10" />
            </div>
          </div>
        </div>
        <div className="page-size">
          {/* todo: select box with predefined options  */}
        </div>
        <div className="footer">
          <button
            type="button"
            onClick={() => {
              PrintCanvas(width, height, scaleDown);
            }}
          >
            Print
          </button>
          <button
            type="button"
            onClick={() => {
              CovnertToPDF(width, height);
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
