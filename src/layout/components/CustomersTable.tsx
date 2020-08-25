import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import AddCompany from "./AddCompanyDialog";
import FullScreenCompanyDialog from "./CompanyDialog";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  pagination: {
    marginTop: 10,
  },
  head: {},
  cell: {
    fontWeight: "bold",
  },
  toolbar: {
    height: "50px",
    padding: "0 20px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const CustomerTab = (props: any) => {
  const { type } = props;
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [companies, setCompanies] = React.useState<any[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const [companySelected, setCompanySelected] = React.useState({});
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSavedCompany = () => {
    if (page === 1) {
      getCompanies();
    } else {
      setPage(1);
    }
  };

  const onFullDialogClosed = async () => {
    await getCompanies();
    setIsCompanyDialogOpen(false);
  };

  const getCompanies = () => {
    fetch(
      `http://localhost:8000/companies?page=${page}&type=${type}${
        searchText ? `&search=${searchText}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data.data);
        setTotalLength(data.totalLength);
      });
  };

  useEffect(() => {
    const timeOutOnchange = setTimeout(() => {
      setPage(1);
      getCompanies();
    }, 500);
    return () => clearTimeout(timeOutOnchange);
  }, [searchText]);

  useEffect(() => {
    getCompanies();
  }, [page]);

  return (
    <div className="table">
      <div className={classes.toolbar}>
        <TextField
          id="outlined-basic"
          label="Recherche"
          size="small"
          variant="outlined"
          onChange={async (e) => {
            setSearchText(e.target.value);
          }}
        />
        <AddCompany role={type} handleSavedCompany={handleSavedCompany} />

        {isCompanyDialogOpen ? (
          <FullScreenCompanyDialog
            company={companySelected}
            onClose={onFullDialogClosed}
          />
        ) : null}
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.cell}>Nom</TableCell>
              <TableCell className={classes.cell} align="right">
                Ville
              </TableCell>
              <TableCell className={classes.cell} align="right">
                Code Postal
              </TableCell>
              <TableCell className={classes.cell} align="right">
                Téléphone
              </TableCell>
              <TableCell className={classes.cell} align="right">
                Activité
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell component="th" scope="row">
                  <Button
                    color="primary"
                    onClick={() => {
                      setCompanySelected(company);
                      setIsCompanyDialogOpen(true);
                    }}
                  >
                    {company.name}
                  </Button>
                </TableCell>
                <TableCell align="right">{company.location.city}</TableCell>
                <TableCell align="right">{company.location.postCode}</TableCell>
                <TableCell align="right">{company.phone}</TableCell>
                <TableCell align="right">{company.activity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        className={classes.pagination}
        page={page}
        count={
          totalLength % 10 === 0
            ? Math.trunc(totalLength / 10)
            : Math.trunc(totalLength / 10 + 1)
        }
        color="secondary"
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomerTab;
