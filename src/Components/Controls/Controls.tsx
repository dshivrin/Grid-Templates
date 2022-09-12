import React from "react";
import "./Controls.css"

const Controls = (props: any) => {
  const { onPrintClick, onDownloadClick } = props;
  return (
    <div className="controls-wrapper">
      <div className="vertical">
        <label>Vertical</label>
        <input type="checkbox" id="incluideVertical" value="true"/>
        <input type="number" id="vertical-spacing" min="1" max="10" />
        <input type="number" id="angle" min="50" max="60" value="55" />
      </div>
      <div className="horizontal">
        <label>Horizontal</label>
        <input type="checkbox" id="incluideHorizontal" value="true"/>
        <input type="number" id="horizontal-spacing" min="1" max="10" />
      </div>
      <div className="footer">
        <button type="button" onClick={onPrintClick}>
          Print
        </button>
        <button type="button" onClick={onDownloadClick}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Controls;
