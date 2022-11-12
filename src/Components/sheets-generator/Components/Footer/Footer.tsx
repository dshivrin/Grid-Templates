import { useAppSelector } from "state/hooks";
import { prepareBlackLetterForPrinting } from "Utils/scripts/Blackletter";
import { prepareCopperPlateForPrinting } from "Utils/scripts/Copperplate";
import { PrintCanvas, SaveAsPDF } from "Utils/Utils";

const Footer = () => {
  //const pageSize = useAppSelector((state) => state.canvas.pageSize);
  const width = useAppSelector((state) => state.canvas.width);
  const height = useAppSelector((state) => state.canvas.height);

  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  //const pageOrientation = useAppSelector((state) => state.canvas.pageOrientation); //?
  const templateType = useAppSelector((state) => state.canvas.template);

  //poined nib
  const angle = useAppSelector((state) => state.copperplate.angle);
  const drawHorizontal = useAppSelector(
    (state) => state.copperplate.drawHorizontal
  );
  const drawVertical = useAppSelector(
    (state) => state.copperplate.drawVertical
  );
  const horizontalInterval = useAppSelector(
    (state) => state.copperplate.horizontalInterval
  );
  const verticaleInterval = useAppSelector(
    (state) => state.copperplate.verticaleInterval
  );

  //broad nib
  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);
  const marginTop = useAppSelector((state) => state.blackLetter.marginTop);
  const bodySize = useAppSelector((state) => state.blackLetter.bodySize);
  const lineSpacing = useAppSelector((state) => state.blackLetter.lineSpacing);
  const trailingSize = useAppSelector(
    (state) => state.blackLetter.trailingSize
  );
  const drawNibs = useAppSelector(
    (state) => state.blackLetter.drawNibs
  );
  const drawAccender = useAppSelector(
    (state) => state.blackLetter.drawAccender
  );
  const drawDescender = useAppSelector(
    (state) => state.blackLetter.drawDescender
  );

  const printCanvasByTemplateType = () => {
    let pcanvas : HTMLCanvasElement | undefined;
    switch (templateType) {
      case "Broad Nib":
        pcanvas = prepareBlackLetterForPrinting(
          width,
          height,
          lineWidth,
          nibSize,
          marginTop,
          bodySize,
          trailingSize,
          lineSpacing,
          drawNibs,
          drawAccender,
          drawDescender
        );
        break;
      case "Pointed Nib":
        pcanvas = prepareCopperPlateForPrinting(
          width,
          height,
          lineWidth,
          angle,
          horizontalInterval,
          verticaleInterval,
          drawHorizontal,
          drawVertical
        );
        break;
    }
    PrintCanvas(pcanvas!);
  };

  const saveCanvasByTemplateType = () => {
    let pcanvas : HTMLCanvasElement | undefined;
    switch (templateType) {
      case "Broad Nib":
        pcanvas = prepareBlackLetterForPrinting(
          width,
          height,
          lineWidth,
          nibSize,
          marginTop,
          bodySize,
          trailingSize,
          lineSpacing,
          drawNibs,
          drawAccender,
          drawDescender
        );
        break;
      case "Pointed Nib":
        pcanvas = prepareCopperPlateForPrinting(
          width,
          height,
          lineWidth,
          angle,
          horizontalInterval,
          verticaleInterval,
          drawHorizontal,
          drawVertical
        );
        break;
    }
    SaveAsPDF(pcanvas!);
  };

  return (
    <div className="footer">
      <button
        type="button"
        className="button-46 print"
        onClick={() => {
          printCanvasByTemplateType();
        }}
      >
        Print
      </button>
      <button
        type="button"
        className="button-46 download"
        onClick={() => {
          saveCanvasByTemplateType();
        }}
      >
        Download
      </button>
    </div>
  );
};

export default Footer;
