import { useAppDispatch, useAppSelector } from "state/hooks";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Footer/Footer";
import PageControls from "./pageControls";
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

const BlackLetterControls = () => {
  const dispatch = useAppDispatch();
  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);
  const marginTop = useAppSelector((state) => state.blackLetter.marginTop);
  const bodySize = useAppSelector((state) => state.blackLetter.bodySize);
  const trailingSize = useAppSelector(
    (state) => state.blackLetter.trailingSize
  );
  const lineSpacing = useAppSelector((state) => state.blackLetter.lineSpacing);
  const drawNibs = useAppSelector((state) => state.blackLetter.drawNibs);
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
    <Form>
      <PageControls />
      <div className="section vertical-controls">
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Nib Size
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              id="nib-size"
              min="1"
              max="10"
              step="0.1"
              value={nibSize}
              onChange={(event) => {
                dispatch(onNibSizeChanged(+event.target.value));
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Margin Top
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              id="margin-top"
              step="0.1"
              value={marginTop}
              onChange={(event) => {
                dispatch(onMarginTopChanged(+event.target.value));
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Body Size
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              id="body-size"
              step="0.1"
              value={bodySize}
              onChange={(event) => {
                dispatch(onBodySizeChanged(+event.target.value));
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Asc / Desc size
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              id="body-size"
              step="0.1"
              value={trailingSize}
              onChange={(event) => {
                dispatch(onTrailingSizeChanged(+event.target.value));
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Line Spacing
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              id="body-size"
              step="0.1"
              value={lineSpacing}
              onChange={(event) => {
                dispatch(onLineSpacingChanged(+event.target.value));
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Include Ascender
          </Form.Label>
          <Col sm="4">
            <Form.Check
              type="switch"
              id="include-accender"
              checked={drawAccender}
              onChange={handleDrawAccenderChanged}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Include Descender
          </Form.Label>
          <Col sm="4">
            <Form.Check
              type="switch"
              id="include-descender"
              checked={drawDescender}
              onChange={handleDrawDescenderChanged}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Draw Nibs
          </Form.Label>
          <Col sm="4">
            <Form.Check
              type="switch"
              id="include-nibs"
              checked={drawNibs}
              onChange={handleDrawNibsChanged}
            />
          </Col>
        </Form.Group>
      </div>
      <Footer />
    </Form>
  );
};

export default BlackLetterControls;
