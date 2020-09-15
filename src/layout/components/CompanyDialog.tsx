import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Grid,
  TextField,
  Paper,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from "@material-ui/core/transitions";
import { modifiyCompany, deleCompany, fetchApi } from "../../utils/fetchAPI";
import ContactTable from "./ContactTable";
import CommentsTable from "./CommentsTable";
import CommentDialog from "./CommentDialog";
import { useEffect } from "react";
import { Contact } from "../../models/Contact";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between",
    },

    button: {
      marginLeft: "10px",
    },
    dialogContent: {
      flexGrow: 1,
    },

    gridItem: {
      display: "flex",
      flexDirection: "column",
    },

    titleh6: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "10px 0",
    },

    textField: {
      marginBottom: "10px",
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  company: any;
  onClose: () => void;
}

export default function FullScreenCompanyDialog(props: Props) {
  const classes = useStyles();
  const [company, setCompany] = React.useState({
    name: props.company.name,
    role: props.company.role,
    city: props.company.location.city,
    address: props.company.location.address,
    postCode: props.company.location.postCode,
    phone: props.company.phone,
    turnover: props.company.turnover,
    siret: props.company.siret,
    NAF: props.company.NAF,
    activity: props.company.activity,
    companyId: props.company._id,
    contacts: props.company.contacts,
  });

  const [contacts, setContacts] = React.useState<[Contact]>(company.contacts);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleClose = () => {
    props.onClose();
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSaveCompany = async () => {
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
      const response = await modifiyCompany(
        `http://localhost:8000/companies/${props.company._id}`,
        companyToSend
      );

      if (response.success) {
        setIsSaved(true);
      } else {
        alert(response.error.message);
      }
    }
  };

  const handleDeleteCompany = async () => {
    const response = await deleCompany(
      `http://localhost:8000/companies/${props.company._id}`
    );
    if (response.success) {
      props.onClose();
    } else {
      alert(response.error.message);
    }
  };

  const refreshContacts = async () => {
    console.log(`/contacts/company/${company.companyId}`);

    const response = await fetchApi(
      `/contacts/company/${company.companyId}`,
      "GET",
      null
    );
    if (response.success) {
      setContacts(response.data);
    } else {
      alert("error refresh contacts");
    }
  };

  useEffect(() => {
    "contacts changed";
    return () => {};
  }, [contacts]);

  useEffect(() => {
    let timer = setTimeout(() => setIsSaved(false), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [isSaved]);

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <div style={{ display: "flex", alignItems: "center" }}>
            {isSaved ? (
              <Paper>
                <Typography
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "bold",
                    padding: "0 10px",
                  }}
                >
                  Changements sauvegardés
                </Typography>
              </Paper>
            ) : null}
            <Button
              className={classes.button}
              onClick={handleSaveCompany}
              variant={"contained"}
              color={"primary"}
            >
              Enregister
            </Button>
            <Button
              className={classes.button}
              onClick={handleDeleteCompany}
              variant={"contained"}
              color={"secondary"}
            >
              Supprimer
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <div className={classes.dialogContent}>
          <Typography color="primary" variant="h6" className={classes.titleh6}>
            Entreprise
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <TextField
                className={classes.textField}
                id="name"
                label="Nom"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.name}
              />
              <TextField
                className={classes.textField}
                id="city"
                label="Ville"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.location?.city}
              />
              <TextField
                className={classes.textField}
                id="address"
                label="Adresse"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.location?.address}
              />
              <TextField
                className={classes.textField}
                id="postCode"
                label="Code Postal"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.location?.postCode}
              />
              <TextField
                className={classes.textField}
                id="phone"
                label="Téléphone"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.phone}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.gridItem}>
              <TextField
                className={classes.textField}
                id="turnover"
                label="Chiffre d'affaires"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.turnover}
              />
              <TextField
                className={classes.textField}
                id="activity"
                label="Activité"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.activity}
              />
              <TextField
                className={classes.textField}
                id="NAF"
                label="NAF"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company.NAF}
              />
              <TextField
                className={classes.textField}
                id="siret"
                label="SIRET"
                variant="outlined"
                onChange={handleChange}
                defaultValue={props.company?.siret}
              />
            </Grid>
          </Grid>
        </div>

        <ContactTable
          contacts={contacts}
          companyId={company.companyId}
          onSavedContacts={refreshContacts}
        />

        <CommentsTable
          comments={props.company.comments}
          company_id={company.companyId}
          contacts={contacts}
        />
      </DialogContent>
    </Dialog>
  );
}
