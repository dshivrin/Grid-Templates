import { useState } from "react";
import { PageSize } from "../../Utils/types";
import {PrintCanvas_old } from "../../Utils/Utils";
import consts from "../../Utils/Consts.json";
import "./Controls.css";
import BasicTabs from "../sheets-generator/Tabs/Tabs";
import { CovnertToPDF_old } from './../../Utils/Utils';

const Controls = () => {
  const pageSizes: Array<PageSize> = consts.pageSizes;
  const defaultPage = pageSizes.find((p) => p.isDefault || p.size === "A4");

  const [selectedPageSize, setSelectedPageSize] = useState(defaultPage!.size);

  const [includeVerticalLines, setIncludeVerticalLines] = useState(true);
  const [verticalSpacing, setVerticalSpacing] = useState(7);

  const [includeHorizontalLines, setIncludeHorizontalLines] = useState(true);
  const [horizontalSpacing, setHorizontalSpacing] = useState(5);

  const [lineWidth, setLineWidth] = useState(1); //default is 1 px

  return (
    <div className="controls-container">
      <div className="inner-container">
        <BasicTabs />
        {/* <div className="footer">
          <button
            type="button"
            className="button-46 print"
            onClick={() => {
              PrintCanvas_old(
                selectedPageSize,
                lineWidth,
                horizontalSpacing,
                verticalSpacing,
                includeHorizontalLines,
                includeVerticalLines
              );
            }}
          >
            Print
          </button>
          <button
            type="button"
            className="button-46 download"
            onClick={() => {
              CovnertToPDF_old(
                selectedPageSize,
                lineWidth,
                horizontalSpacing,
                verticalSpacing,
                includeHorizontalLines,
                includeVerticalLines
              );
            }}
          >
            Download
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Controls;
