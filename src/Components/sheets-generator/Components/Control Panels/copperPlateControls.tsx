import { useAppDispatch, useAppSelector } from "state/hooks";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageControls from "./pageControls";
import {
  onDrawHorizontal,
  onDrawVertical,
  onHorizontalInterval,
  onverticaleInterval,
  onVerticalAngle,
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
    <Form>
      <PageControls />
      <div className="section vertical-controls">
        <Form.Group as={Row} className="mb-1">
          <Form.Label>Vertical Lines</Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Include Vertical lines
          </Form.Label>
          <Col sm="4">
            <Form.Check
              type="switch"
              id="incluideVertical"
              checked={includeVerticalLines}
              onChange={(event) => {
                dispatch(onDrawVertical(event.target.checked));
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Vertical spacing (mm)
          </Form.Label>
          <Col sm="4">
            <Form.Control
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
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Vertical angle (°)
          </Form.Label>
          <Col sm="4">
            <Form.Control
              type="number"
              id="angle"
              min="-60"
              max="60"
              value={verticalAngle}
              onChange={(event) => {
                dispatch(onVerticalAngle(+event.target.value));
              }}
              disabled={true}
            />
          </Col>
        </Form.Group>
      </div>
      <div className="section horizontal-controls">
        <Form.Group as={Row} className="mb-1">
          <Form.Label>Horizontal Lines</Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Include Vertical lines
          </Form.Label>
          <Col sm="4">
            <Form.Check
              type="switch"
              id="incluideHorizontal"
              checked={includeHorizontalLines}
              onChange={(event) => {
                dispatch(onDrawHorizontal(event.target.checked));
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1">
          <Form.Label column sm="7">
            Interval (mm)
          </Form.Label>
          <Col sm="4">
            <Form.Control
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
            />
          </Col>
        </Form.Group>
      </div>
      <Footer />
    </Form>
  );
};

export default CopperPlateControls;
