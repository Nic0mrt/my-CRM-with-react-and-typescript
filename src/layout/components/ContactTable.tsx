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
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import ModifyIcon from "@material-ui/icons/Create";
import AddContactDialog from "./AddContactDialog";
import {
  getContactsByCompanyId,
  deleteContactByIdWithCompanyId,
} from "../../utils/fetchAPI";

import { Contact } from "../../models/Contact";
import ContactDialog from "./ContactDialog";

import React, { useEffect } from "react";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  titleh6: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "30px 0",
  },
  modifyIcon: {
    cursor: "pointer",
    margin: "0 5px",
  },
  deleteButton: {
    cursor: "pointer",
    margin: "0 5px",
  },
});

interface Props {
  contacts: [Contact];
  companyId: string;
  onSavedContacts: () => void;
}

const ContactTable = (props: Props) => {
  const classes = useStyles();
  const [contacts, setContacts] = React.useState(props.contacts);
  const [contactSelected, setContactSelected] = React.useState<Contact>();
  const [isContactDialogOpen, setisContactDialogOpen] = React.useState(false);

  const handleBtnCancelClick = async (event: React.MouseEvent) => {
    const contactId = event.currentTarget.id;
    const response = await deleteContactByIdWithCompanyId(
      "/contacts/company",
      props.companyId,
      contactId
    );

    if (response.success) {
      getNewListOfContacts();
      props.onSavedContacts();
    } else {
      alert("erreur dans la suppression du contact");
    }
  };

  const handleAfterContactsModified = () => {
    getNewListOfContacts();
    props.onSavedContacts();
  };

  const handleOnClosedContactDialog = () => {
    setisContactDialogOpen(false);
  };

  const getNewListOfContacts = async () => {
    const response = await getContactsByCompanyId(
      "/contacts/company",
      props.companyId
    );
    if (response.success) {
      const newContactList = response.data;
      setContacts(newContactList);
    } else {
      alert("erreur dans la création du contact : " + response.error);
    }
  };

  return (
    <div>
      <Typography color="primary" variant="h6" className={classes.titleh6}>
        Contacts
        <AddContactDialog
          companyId={props.companyId}
          onAddedContact={handleAfterContactsModified}
        />
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="dense table of contacts"
        >
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
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="right">Téléphone</TableCell>
              <TableCell align="right">Mail</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell component="th" scope="row">
                  {contact.name}
                </TableCell>
                <TableCell align="right">{contact.firstname}</TableCell>
                <TableCell align="right">{contact.position}</TableCell>
                <TableCell align="right">{contact.mobile}</TableCell>
                <TableCell align="right">{contact.phone}</TableCell>
                <TableCell align="right">{contact.email}</TableCell>
                <TableCell align="right">
                  <ModifyIcon
                    id={contact._id}
                    className={classes.modifyIcon}
                    color="primary"
                    onClick={() => {
                      setContactSelected(contact);
                      setisContactDialogOpen(true);
                    }}
                  />

                  {isContactDialogOpen && contactSelected ? (
                    <ContactDialog
                      contact={contactSelected}
                      onClose={handleOnClosedContactDialog}
                      onSaveContact={handleAfterContactsModified}
                    />
                  ) : null}

                  <CancelIcon
                    id={contact._id}
                    className={classes.deleteButton}
                    color="secondary"
                    onClick={handleBtnCancelClick}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ContactTable;
