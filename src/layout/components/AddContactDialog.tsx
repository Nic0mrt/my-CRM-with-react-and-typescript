import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AddCircleRounded } from "@material-ui/icons/";
import { addContact } from "../../utils/fetchAPI";

interface AddContactDialogProps {
  companyId: string;
  onAddedContact: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

const AddContactDialog = (props: AddContactDialogProps) => {
  const [contact, setContact] = React.useState({
    fistname: "",
    name: "",
    phone: "",
    email: "",
    mobile: "",
    gender: "",
    position: "",
    companyId: props.companyId,
  });

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleCloseDialog = () => {
    setContact({
      fistname: "",
      name: "",
      phone: "",
      email: "",
      mobile: "",
      gender: "",
      position: "",
      companyId: props.companyId,
    });
    setOpen(false);
  };

  const handleAddContact = async () => {
    const response = await addContact(
      `/companies/${contact.companyId}/contacts`,
      contact
    );
    if (response.success) {
      setOpen(false);
      props.onAddedContact();
    } else {
      alert(response.error);
    }
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContact({ ...contact, [event.target.id]: event.target.value });
  };

  const handleGenderSelection = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    let gender = event.target.value as string;
    setContact({ ...contact, gender: gender });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div style={{ margin: "0 5px" }}> ajouter</div>
        <AddCircleRounded fontSize="default" style={{ cursor: "pointer" }} />
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="add-contact-title"
        aria-describedby="add-contact-description"
      >
        <DialogTitle id="add-contact-alert-dialog-title">
          {"Ajouter un contact"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="add-company-alert-dialog-description">
            Cliquer sur sauvegarder pour ajouter un contact
          </DialogContentText>

          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Nom"
              required
              error={contact.name.replace(/\s/g, "").length > 0 ? false : true}
              helperText={
                contact.name.replace(/\s/g, "").length > 0
                  ? null
                  : "le champ doit être renseigné"
              }
              onChange={handleTextFieldChange}
            />
            <TextField
              id="firstname"
              label="Prénom"
              onChange={handleTextFieldChange}
            ></TextField>

            <FormControl>
              <InputLabel id="gender-selection">Intitulé</InputLabel>
              <Select
                value={contact.gender}
                labelId="gender-selection"
                id="gender"
                onChange={handleGenderSelection}
              >
                <MenuItem value={""}>
                  <em>vide</em>
                </MenuItem>
                <MenuItem value={"M"}>Monsieur</MenuItem>
                <MenuItem value={"Mme"}>Madame</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="position"
              label="Poste"
              onChange={handleTextFieldChange}
            ></TextField>

            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={handleTextFieldChange}
            ></TextField>

            <TextField
              id="mobile"
              label="Mobile"
              onChange={handleTextFieldChange}
            ></TextField>
            <TextField
              id="phone"
              label="Téléphone"
              onChange={handleTextFieldChange}
            ></TextField>
          </form>

          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary" autoFocus>
              Annuler
            </Button>
            <Button onClick={handleAddContact} color="secondary">
              Ajouter
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddContactDialog;
