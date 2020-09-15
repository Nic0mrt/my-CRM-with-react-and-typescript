import React, { useEffect } from "react";
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
import { Comment } from "../../models/Comment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchApi } from "../../utils/fetchAPI";

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

interface CommentDialogProps {
  contacts: [Contact];
  comment: Comment;
  onClose: () => void;
  onSaveComment: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactDialog = (props: CommentDialogProps) => {
  const classes = useStyles();
  const [isSaved, setIsSaved] = React.useState(false);
  const [comment, setComment] = React.useState(props.comment);
  const [commentDescription, setCommentDescription] = React.useState(
    props.comment.description
  );

  const handleClose = () => {
    props.onClose();
  };

  const handleSelectContactOfComment = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newComment = { ...comment, contact: event.target.value as string };
    setComment(newComment);
  };

  useEffect(() => {
    let timer = setTimeout(() => setIsSaved(false), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [isSaved]);

  const handleSavedComment = async () => {
    const commentToSend = { ...comment, description: commentDescription };
    const response = await fetchApi(
      `/comments/${comment._id}`,
      "PUT",
      JSON.stringify(commentToSend)
    );

    if (response.success) {
      setIsSaved(true);
      props.onSaveComment();
    } else {
      alert("erreur de modification ");
    }
  };

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
            <Button color="inherit" onClick={handleSavedComment}>
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
              <InputLabel id="demo-simple-select-label">Contact</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={`${comment.contact}`}
                onChange={handleSelectContactOfComment}
              >
                <MenuItem value={""}>Aucun</MenuItem>
                {props.contacts.map((contact) => {
                  return (
                    <MenuItem
                      key={contact._id}
                      value={`${contact.firstname} ${contact.name}`}
                    >
                      {contact.firstname + " " + contact.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <ReactQuill
                theme="snow"
                value={commentDescription}
                onChange={setCommentDescription}
              ></ReactQuill>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
