import { useAppDispatch, useAppSelector } from "state/hooks";
import PageControls from "./pageControls";
import {
  onDrawHorizontal,
  onDrawVertical,
  onHorizontalInterval,
  onverticaleInterval,
  onVerticalAngle
} from "state/slices/copperPlateSlice";
import Footer from "../Footer/Footer";

const CopperPlateControls = () => {
  const dispatch = useAppDispatch();
  const includeVerticalLines = useAppSelector(
    (state) => state.copperplate.drawVertical
  );
  const includeHorizontalLines = useAppSelector(
    (state) => state.copperplate.drawHorizontal
  );
  const verticalSpacing = useAppSelector(
    (state) => state.copperplate.verticaleInterval
  );
  const horizontalSpacing = useAppSelector(
    (state) => state.copperplate.horizontalInterval
  );
  const verticalAngle = useAppSelector((state) => state.copperplate.angle);

  return (
    <div>
      <PageControls />
      <div>
        <label>Vertical</label>
        <div className="section vertical-controls">
          <div>
            <label>Include Vertical lines? </label>
            <input
              type="checkbox"
              id="incluideVertical"
              checked={includeVerticalLines}
              onChange={(event) => {
                dispatch(onDrawVertical(event.target.checked));
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
              step="0.1"
              value={verticalSpacing}
              onChange={(event) => {
                dispatch(onverticaleInterval(+event.target.value));
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
              min="-60"
              max="60"
              value={verticalAngle}
              onChange={(event) => {
                dispatch(onVerticalAngle(+event.target.value));
               //setVerticalAngle(+event.target.value);
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
                onChange={(event) => {
                  dispatch(onDrawHorizontal(event.target.checked));
                }}
              />
            </div>
            <div>
              <label>Horizontal spacing: </label>
              <input
                type="number"
                id="horizontal-spacing"
                min="1"
                max="15"
                step="0.1"
                value={horizontalSpacing}
                disabled={!includeHorizontalLines}
                onChange={(event) => {
                  dispatch(onHorizontalInterval(+event.target.value));
                }}
              />{" "}
              mm
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CopperPlateControls;
