import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./layout/components/Menu";
import Invoice from "./layout/pages/Invoice";
import Customer from "./layout/pages/Customer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue, pink } from "@material-ui/core/colors/";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Menu />
          <Switch>
            <Route path="/customers">
              <Customer />
            </Route>
            <Route path="/invoices">
              <Invoice />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
