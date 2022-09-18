import landscapeLogo from "../../Media/landscape-mode.png";
import portpaitLogo from "../../Media/portrait-mode.png";
import { ControlsProps, PageSize } from "../../Utils/types";
import "./Controls.css";

const Controls = (props: ControlsProps) => {
  const {
    includeVerticalLines,
    includeHorizontalLines,
    verticalAngle,
    verticalSpacing,
    horizontalSpacing,
    selectedPageSize,
    pageSizes,
    lineWidth,
    setLineWidth,
    onOrientationChange,
    onPageSizeChanged,
    setIncludeVerticalLines,
    setIncludeHorizontalLines,
    setVerticalAngle,
    setVerticalSpacing,
    setHorizontalSpacing,
    PrintCanvas,
    CovnertToPDF,
  } = props;

  return (
    <div className="inner-container">
      <label>Page</label>
      <div className="section page-size-selector">
        <div className="page-size">
          <label>Page Size: </label>
          <select
            value={selectedPageSize}
            onChange={(event) => {
              onPageSizeChanged(event.target.value);
            }}
          >
            {pageSizes.map((p: PageSize) => {
              return (
                <option key={`optionKey:${p.size}`} value={p.size}>
                  {p.size}
                </option>
              );
            })}
          </select>
        </div>
        <div className="line-width">
          <label>Line Width: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={lineWidth}
            onChange={(event) => {
              setLineWidth(+event.target.value);
            }}
          />{" "}
          px
        </div>
        <div className="page-orientation">
          <label>
            <input
              type="radio"
              name="orientation"
              value="p"
              defaultChecked
              onChange={(event) => onOrientationChange(event.target.value)}
            />
            <img src={portpaitLogo} alt="portrait mode" />
          </label>
          <label>
            <input
              type="radio"
              name="orientation"
              value="l"
              onChange={(event) => onOrientationChange(event.target.value)}
            />
            <img src={landscapeLogo} alt="portrait mode" />
          </label>
        </div>
      </div>

      <label>Vertical</label>
      <div className="section vertical-controls">
        <div>
          <label>Include Vertical lines? </label>
          <input
            type="checkbox"
            id="incluideVertical"
            checked={includeVerticalLines}
            onChange={() => {
              setIncludeVerticalLines(!includeVerticalLines);
            }}
          />
        </div>
        <div>
          <label>Vertical spacing: </label>
          <input
            type="number"
            id="vertical-spacing"
            min="1"
            max="10"
            value={verticalSpacing}
            onChange={(event) => {
              setVerticalSpacing(+event.target.value);
            }}
            disabled={!includeVerticalLines}
          />{" "}
          mm
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
            //disabled={!includeVerticalLines}
            disabled={true}
          />{" "}
          °
        </div>
      </div>
      <label>Horizontal</label>
      <div className="section horizontal-controls">
        <div>
          <div>
            <label>Include Horizontal lines? </label>
            <input
              type="checkbox"
              id="incluideHorizontal"
              checked={includeHorizontalLines}
              onChange={() =>
                setIncludeHorizontalLines(!includeHorizontalLines)
              }
            />
          </div>
          <div>
            <label>Horizontal spacing: </label>
            <input
              type="number"
              id="horizontal-spacing"
              min="1"
              max="15"
              value={horizontalSpacing}
              disabled={!includeHorizontalLines}
              onChange={(event) => {
                setHorizontalSpacing(+event.target.value);
              }}
            />{" "}
            mm
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          className="button-46 print"
          onClick={() => {
            PrintCanvas(
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
            CovnertToPDF(
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
      </div>
    </div>
  );
};

export default Controls;
