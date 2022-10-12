import { SyntheticEvent, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabPanelProps, TabsProps, templateType } from "Utils/types";
import { useAppDispatch } from "state/hooks";
import { onTemplateChanged } from "state/slices/canvasSlice";

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

function a11yProps(index: number, name: string) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    "template-type": name,
  };
}

export default function BasicTabs(props: TabsProps) {
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();

  const { tabs } = props;
  //SyntheticEvent is a wierd creature that misses lots of properties for some reson
  const onTabChanged = (event: any, newIndex: number) => {
    setValue(newIndex);

    const type =
      (event.currentTarget.attributes[`template-type`].value as templateType) ||
      "";
    dispatch(onTemplateChanged(type));
  };

  return (
    <div className="controls-container">
      <div className="inner-container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={onTabChanged}
              aria-label="basic tabs example"
            >
              {Object.keys(tabs).map((t, index) => {
                return <Tab label={t} {...a11yProps(index, t)} />;
              })}
            </Tabs>
          </Box>

          {Object.keys(tabs).map((t, index) => {
            return (
              <TabPanel value={value} index={index}>
                {tabs[t]}
              </TabPanel>
            );
          })}
        </Box>
      </div>
    </div>
  );
}
