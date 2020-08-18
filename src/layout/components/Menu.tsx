import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appbar: {
    height: "60px",
  },

  toolbar__list: {
    margin: "0 30px",
  },
});

function Menu() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar>
        <Typography
          className={classes.toolbar__list}
          variant="h6"
          color="inherit"
        >
          <Link
            to="/customers"
            style={{ color: "white", textDecorationLine: "none" }}
          >
            Clients
          </Link>
        </Typography>
        <Typography
          className={classes.toolbar__list}
          variant="h6"
          color="inherit"
        >
          <Link
            to="/invoices"
            style={{ color: "white", textDecorationLine: "none" }}
          >
            Facturation
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
