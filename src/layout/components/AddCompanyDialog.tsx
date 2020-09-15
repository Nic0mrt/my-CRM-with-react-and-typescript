import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { postCompany } from "../../utils/fetchAPI";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { AddCircleRounded } from "@material-ui/icons/";

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
  },
});

interface dialogProps {
  role: string;
  handleSavedCompany: () => void;
}

export default function AddCompany(props: dialogProps) {
  const [open, setOpen] = React.useState(false);
  const [company, setCompany] = React.useState({
    name: "",
    role: props.role,
    city: "",
    address: "",
    postCode: "",
    phone: "",
    turnover: "",
    siret: "",
    NAF: "",
    activity: "",
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch (event.target.id) {
      case "name":
        setCompany({ ...company, name: event.target.value });
        break;
      case "city":
        setCompany({ ...company, city: event.target.value });
        break;
      case "address":
        setCompany({ ...company, address: event.target.value });
        break;
      case "postCode":
        setCompany({ ...company, postCode: event.target.value });
        break;
      case "phone":
        setCompany({ ...company, phone: event.target.value });
        break;
      case "turnover":
        setCompany({ ...company, turnover: event.target.value });
        break;
      case "siret":
        setCompany({ ...company, siret: event.target.value });
        break;
      case "NAF":
        setCompany({ ...company, NAF: event.target.value });
        break;
      case "activity":
        setCompany({ ...company, activity: event.target.value });
        break;
    }
  };

  const handleAddCompany = async () => {
    if (company.name.replace(/\s/g, "").length > 0) {
      const companyToSend = {
        name: company.name,
        role: company.role,
        location: {
          city: company.city,
          address: company.address,
          postCode: company.postCode,
        },
        phone: company.phone,
        turnover: company.turnover,
        siret: company.siret,
        NAF: company.NAF,
        activity: company.activity,
      };
      const response = await postCompany(
        "http://localhost:8000/companies",
        companyToSend
      );
      if (response.success) {
        setOpen(false);
        props.handleSavedCompany();
      } else {
        alert(response.error.message);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
        style={{ marginLeft: "20px" }}
      >
        <div style={{ margin: "0 5px" }}> ajouter</div>
        <AddCircleRounded fontSize="default" style={{ cursor: "pointer" }} />
      </Button>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="add-company-title"
        aria-describedby="add-company-description"
      >
        <DialogTitle id="add-company-alert-dialog-title">
          {"Ajouter une entreprise"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="add-company-alert-dialog-description">
            Cliquer sur ajouter pour sauvegarder l'entreprise
          </DialogContentText>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Nom"
              required
              error={company.name.replace(/\s/g, "").length > 0 ? false : true}
              helperText={
                company.name.replace(/\s/g, "").length > 0
                  ? null
                  : "le champ doit être renseigné"
              }
              onChange={handleTextFieldChange}
            />
            <TextField
              id="city"
              label="Ville"
              onChange={handleTextFieldChange}
            />
            <TextField
              id="address"
              label="Adresse"
              onChange={handleTextFieldChange}
            />
            <TextField
              id="postCode"
              label="Code Postal"
              onChange={handleTextFieldChange}
            />
            <TextField
              id="phone"
              label="Téléphone"
              onChange={handleTextFieldChange}
            />
            <TextField
              id="turnover"
              label="Chiffre d'affaires"
              onChange={handleTextFieldChange}
            />
            <TextField
              id="NAF"
              label="Code NAF"
              onChange={handleTextFieldChange}
            />
            <TextField
              id="siret"
              label="SIRET"
              onChange={handleTextFieldChange}
            />
            <TextField
              id="activity"
              label="Activité"
              onChange={handleTextFieldChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Annuler
          </Button>
          <Button onClick={handleAddCompany} color="secondary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
