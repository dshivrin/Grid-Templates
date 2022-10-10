import { useAppDispatch, useAppSelector } from "state/hooks";
import { PageSize } from "Utils/types";
import consts from "Utils/Consts.json";
import landscapeLogo from "Media/landscape-mode.png";
import portpaitLogo from "Media/portrait-mode.png";
import {
  onPageSizeChanged,
  onOrientationChanged,
  onLineWidthChange,
} from "state/slices/canvasSlice";

const pageSizes = consts.pageSizes;

const PageControls = () => {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector((state) => state.canvas.pageSize);
  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  const pageOrientation = useAppSelector(
    (state) => state.canvas.pageOrientation
  ); //?

  return (
    <div>
      <label>Page</label>
      <div className="section page-size-selector">
        <div className="page-size">
          <label>Page Size: </label>
          <select
            value={pageSize}
            onChange={(event) => {
              dispatch(onPageSizeChanged(event.target.value));
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
            step="0.1"
            value={lineWidth}
            onChange={(event) => {
              dispatch(onLineWidthChange(+event.target.value));
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
              checked={pageOrientation === "p"}
              onChange={(event) =>
                dispatch(onOrientationChanged(event.target.value))
              }
            />
            <img src={portpaitLogo} alt="portrait mode" />
          </label>
          <label>
            <input
              type="radio"
              name="orientation"
              value="l"
              checked={pageOrientation === "l"}
              onChange={(event) =>
                dispatch(onOrientationChanged(event.target.value))
              }
            />
            <img src={landscapeLogo} alt="portrait mode" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PageControls;
