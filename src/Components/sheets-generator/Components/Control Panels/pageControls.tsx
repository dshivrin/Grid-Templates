import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OnImageClickEvent, PageSize } from "Utils/types";
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
  );

  const portraitImageRef = useRef<HTMLImageElement>(null);
  const landscapeImageRef = useRef<HTMLImageElement>(null);

  const changeOrientation = (event: OnImageClickEvent) => {
    //set selected on image
    const value = event.currentTarget.attributes
      .getNamedItem("data-value")
      ?.value.toString();
    if (value !== pageOrientation)
      setSelectedOrientationImage(value || pageOrientation);

    dispatch(onOrientationChanged(value));
  };

  const setSelectedOrientationImage = (value: string) => {
    if (value === "p") {
      portraitImageRef.current?.classList.add("img-selected");
      landscapeImageRef.current?.classList.remove("img-selected");
    } else {
      portraitImageRef.current?.classList.remove("img-selected");
      landscapeImageRef.current?.classList.add("img-selected");
    }
  };

  useEffect(() => {
    pageOrientation === "p"
      ? portraitImageRef.current?.classList.toggle("img-selected")
      : landscapeImageRef.current?.classList.toggle("img-selected");
  }, []);

  return (
    <div className="section page-size-selector">
      <Form.Group as={Row} className="mb-1">
        <Form.Label>Page</Form.Label>
        <Form.Label column sm="7">
          Page Size
        </Form.Label>
        <Col sm="4">
          <Form.Select
            aria-label="Select Page Size"
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
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-1">
        <Form.Label column sm="7">
          Line Width
        </Form.Label>
        <Col sm="4">
          <Form.Control
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={lineWidth}
            onChange={(event) => {
              dispatch(onLineWidthChange(+event.target.value));
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-1">
        <Form.Label column sm="7">
          Orientation
        </Form.Label>
        <Form.Label classname="special" column sm="2">
          <img
            data-value="l"
            onClick={(event: OnImageClickEvent) => changeOrientation(event)}
            src={landscapeLogo}
            alt="landscape mode"
            ref={landscapeImageRef}
          />
          <Form.Check
            inline
            type="radio"
            id="orientation"
            name="orientation"
            value="l"
            checked={pageOrientation === "l"}
            onChange={(event) =>
              dispatch(onOrientationChanged(event.target.value))
            }
          />
        </Form.Label>
        <Form.Label classname="special" column sm="2">
          <img
            data-value="p"
            onClick={(event: OnImageClickEvent) => changeOrientation(event)}
            src={portpaitLogo}
            alt="portrait mode"
            ref={portraitImageRef}
          />
          <Form.Check
            inline
            type="radio"
            id="orientation"
            name="orientation"
            value="p"
            checked={pageOrientation === "p"}
            onChange={(event) =>
              dispatch(onOrientationChanged(event.target.value))
            }
          />
        </Form.Label>
      </Form.Group>
    </div>
  );
};

export default PageControls;
