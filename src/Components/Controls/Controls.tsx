import "./Controls.css";

const Controls = (props: any) => {
  const {
    includeVerticaLines,
    verticalAngle,
    verticalSpacing,
    setIncludeVerticaLines,
    setVerticalAngle,
    setVerticalSpacing,
    PrintCanvas,
    CovnertToPDF,
  } = props;

  const onDisableVerticalClick = (event: any) => {
    setIncludeVerticaLines(event.target.value);
    const currValue = event.target.value ? verticalAngle : 0;
  };

  const onDisableHorizontalClick = () => {};

  return <div>Controls</div>;
};

export default Controls;
