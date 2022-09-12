import React from "react";
// @ts-ignore
import Canvas from "../Canvas/Canvas.tsx";
// @ts-ignore
import Controls from "../Controls/Controls.tsx";
import './TemplateCreator.css';

const TemplateCreator = () => {
  return (
    <div className="content-container">
      <Canvas />
      <Controls />
    </div>
  );
};

export default TemplateCreator;
