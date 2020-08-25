import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface Props {
  contacts: any;
}

const ContactTable = (props: Props) => {
  const classes = useStyles();
  const [contacts, setContacts] = React.useState<any[]>(props.contacts);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>Nom</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Prénom</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>Fonction</Typography>
            </TableCell>
            <TableCell align="right">Téléphone</TableCell>
            <TableCell align="right">Mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell component="th" scope="row">
                <Button color="primary">{contact.name}</Button>
              </TableCell>
              <TableCell align="right">{contact.firstname}</TableCell>
              <TableCell align="right">{contact.position}</TableCell>
              <TableCell align="right">{contact.phone}</TableCell>
              <TableCell align="right">{contact.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactTable;
