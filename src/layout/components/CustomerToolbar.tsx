import React from "react";
import { Tab, Tabs, Box, Paper } from "@material-ui/core";
import CustomersTab from "../components/CustomersTab";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box component="div">{children}</Box>}
    </div>
  );
}

function CustomerToolbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="toolbar">
      <Paper>
        <Tabs
          aria-label="simple tabs example"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Clients" id="0" />
          <Tab label="Prospects" id="1" />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <CustomersTab type="client"></CustomersTab>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomersTab type="prospect"></CustomersTab>
      </TabPanel>
    </div>
  );
}

export default CustomerToolbar;
