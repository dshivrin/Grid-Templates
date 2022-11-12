import { useAppDispatch, useAppSelector } from "state/hooks";
import {
  onNibSizeChanged,
  onMarginTopChanged,
  onBodySizeChanged,
  onTrailingSizeChanged,
  onLineSpacingChanged,
  onDrawNibsChanged,
  onDrawAccenderChanged,
  onDrawDescenderChanged,
} from "state/slices/blackLetterSlice";
import Footer from "../Footer/Footer";
import PageControls from "./pageControls";

const BlackLetterControls = () => {
  const dispatch = useAppDispatch();
  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);
  const marginTop = useAppSelector((state) => state.blackLetter.marginTop);
  const bodySize = useAppSelector((state) => state.blackLetter.bodySize);
  const trailingSize = useAppSelector(
    (state) => state.blackLetter.trailingSize
  );
  const lineSpacing = useAppSelector((state) => state.blackLetter.lineSpacing);
  const drawNibs = useAppSelector(
    (state) => state.blackLetter.drawNibs
  );
  const drawAccender = useAppSelector(
    (state) => state.blackLetter.drawAccender
  );
  const drawDescender = useAppSelector(
    (state) => state.blackLetter.drawDescender
  );

  const handleDrawNibsChanged = (event: any) => {
    const checked = Boolean(event.target.checked);
    dispatch(onDrawNibsChanged(checked));
  };

  const handleDrawAccenderChanged = (event: any) => {
    const checked = Boolean(event.target.checked);
    dispatch(onDrawAccenderChanged(checked));
  };

  const handleDrawDescenderChanged = (event: any) => {
    const checked = Boolean(event.target.checked);
    dispatch(onDrawDescenderChanged(checked));
  };

  return (
    <div>
      <PageControls />
      <div className="section vertical-controls">
        <div>
          <label>Nib Size: </label>
          <input
            type="number"
            id="nib-size"
            min="1"
            max="10"
            step="0.1"
            value={nibSize}
            onChange={(event) => {
              dispatch(onNibSizeChanged(+event.target.value));
            }}
          />{" "}
          mm
        </div>
        <div>
          <label>Margin Top: </label>
          <input
            type="number"
            id="margin-top"
            step="0.1"
            value={marginTop}
            onChange={(event) => {
              dispatch(onMarginTopChanged(+event.target.value));
            }}
          />{" "}
        </div>
        <div>
          <label>Body Size: </label>
          <input
            type="number"
            id="body-size"
            step="0.1"
            value={bodySize}
            onChange={(event) => {
              dispatch(onBodySizeChanged(+event.target.value));
            }}
          />{" "}
        </div>
        <div>
          <label>Assender / Descender size: </label>
          <input
            type="number"
            id="body-size"
            step="0.1"
            value={trailingSize}
            onChange={(event) => {
              dispatch(onTrailingSizeChanged(+event.target.value));
            }}
          />{" "}
        </div>
        <div>
          <label>Line Spacing: </label>
          <input
            type="number"
            id="body-size"
            step="0.1"
            value={lineSpacing}
            onChange={(event) => {
              dispatch(onLineSpacingChanged(+event.target.value));
            }}
          />{" "}
        </div>
        <div>
          <label>Include Accender: </label>
          <input
            type="checkbox"
            id="include-accender"
            checked={drawAccender}
            onChange={handleDrawAccenderChanged}
          />{" "}
        </div>
        <div>
          <label>Include Descender: </label>
          <input
            type="checkbox"
            id="include-descender"
            checked={drawDescender}
            onChange={handleDrawDescenderChanged}
          />{" "}
        </div>
        <div>
          <label>Draw Nibs: </label>
          <input
            type="checkbox"
            id="include-nibs"
            checked={drawNibs}
            onChange={handleDrawNibsChanged}
          />{" "}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlackLetterControls;
