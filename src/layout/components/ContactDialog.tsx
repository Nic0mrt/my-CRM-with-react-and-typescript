import React from "react";
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
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from "@material-ui/core/transitions";
import { Contact } from "../../models/Contact";
import { modifyContactWithId } from "../../utils/fetchAPI";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    toolBar: {
      display: "flex",
      justifyContent: "space-between",
    },

    dialogContent: {
      flexGrow: 1,
      marginTop: "10px",
    },

    gridItem: {
      display: "flex",
      flexDirection: "column",
    },

    textField: {
      marginBottom: "10px",
    },
  })
);

interface ContactDialogProps {
  contact: Contact;
  onClose: () => void;
  onSaveContact: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactDialog = (props: ContactDialogProps) => {
  const classes = useStyles();
  const [isSaved, setIsSaved] = React.useState(false);
  const [contact, setContact] = React.useState(props.contact);

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

  const handleSavedContact = async () => {
    const response = await modifyContactWithId(
      "/contacts/",
      contact._id,
      contact
    );

    if (response.success) {
      setIsSaved(true);
      props.onSaveContact();
    } else {
      alert(response.error);
    }
  };

  const handleClose = () => {
    props.onClose();
  };

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
            <Button color="inherit" onClick={handleSavedContact}>
              {" "}
              Enregistrer{" "}
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <FormControl style={{ marginBottom: "10px" }}>
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
              className={classes.textField}
              id="name"
              label="Nom"
              variant="outlined"
              defaultValue={contact.name}
              onChange={handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              id="firstname"
              label="Prénom"
              variant="outlined"
              defaultValue={contact.firstname}
              onChange={handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              id="position"
              label="Poste"
              variant="outlined"
              defaultValue={contact.position}
              onChange={handleTextFieldChange}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <TextField
              className={classes.textField}
              id="phone"
              label="Téléphone"
              variant="outlined"
              defaultValue={contact.phone}
              onChange={handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              id="mobile"
              label="Mobile"
              variant="outlined"
              defaultValue={contact.mobile}
              onChange={handleTextFieldChange}
            />
            <TextField
              className={classes.textField}
              id="email"
              label="Email"
              variant="outlined"
              defaultValue={contact.email}
              onChange={handleTextFieldChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
