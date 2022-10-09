import { useAppSelector } from "state/hooks";
import { prepareBlackLetterForPrinting } from "Utils/Blackletter";
import { prepareCopperPlateForPrinting } from "Utils/Copperplate";
import { PrintCanvas, SaveAsPDF } from "Utils/Utils";

const Footer = () => {
  //const pageSize = useAppSelector((state) => state.canvas.pageSize);
  const width = useAppSelector((state) => state.canvas.width);
  const height = useAppSelector((state) => state.canvas.height);

  const lineWidth = useAppSelector((state) => state.canvas.lineWidth);
  //const pageOrientation = useAppSelector((state) => state.canvas.pageOrientation); //?
  const templateType = useAppSelector((state) => state.canvas.template);

  //copperPlate props
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

  //BlackLetter props
  const nibSize = useAppSelector((state) => state.blackLetter.nibSize);

  const printCanvasByTemplateType = () => {
    let pcanvas;
    switch (templateType) {
      case "BlackLetter":
        pcanvas = prepareBlackLetterForPrinting(
          width,
          height,
          lineWidth,
          nibSize,
          nibSize * 10
        );
        PrintCanvas(pcanvas!);
        break;
      case "CopperPlate":
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
        PrintCanvas(pcanvas!);
        break;
    }
  };

  const saveCanvasByTemplateType = () => {
    let pcanvas;
    switch (templateType) {
      case "BlackLetter":
        pcanvas = prepareBlackLetterForPrinting(
          width,
          height,
          lineWidth,
          nibSize,
          nibSize * 10
        );
        SaveAsPDF(pcanvas!);
        break;
      case "CopperPlate":
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
        SaveAsPDF(pcanvas!);
        break;
    }
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
