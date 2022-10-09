import { useAppDispatch, useAppSelector } from "state/hooks";
import { onNibSizeChanged } from "state/slices/blackLetterSlice";
import Footer from "../Footer";
import PageControls from "./pageControls";

const BlackLetterControls = () => {
  const dispatch = useAppDispatch();
  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);

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
      </div>
      <Footer/>
    </div>
  );
};

export default BlackLetterControls;
