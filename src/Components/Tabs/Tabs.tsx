import { SyntheticEvent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabPanelProps, templateType } from "../../Utils/types";
import CopperPlateControls from "../Controls/scripts/copperPlateControls";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { onTemplateChanged } from "../../state/slices/canvasSlice";
import BlackLetterControls from "../Controls/scripts/blackLetterControls";

const dic = { 0: "copperPlate", 1: "blackLetter" };

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props: any) {
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    //todo: make dictionary or some type converter, because the tabs use numeric index
    const type = (newValue ? "BlackLetter" : "CopperPlate") as templateType;
    dispatch(onTemplateChanged(type));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="CopperPlate" {...a11yProps(0)} />
          <Tab label="BlackLetter" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CopperPlateControls />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BlackLetterControls />
      </TabPanel>
    </Box>
  );
}
