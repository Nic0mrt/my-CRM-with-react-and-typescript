import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import "./quill.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AddCircleRounded } from "@material-ui/icons/";
import { Contact } from "../../models/Contact";
import { fetchApi } from "../../utils/fetchAPI";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface AddCommentDialogProps {
  companyId: string;
  onAddedComment: () => void;
  contacts: [Contact];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: "100%",
    },
    commentTextField: {
      minHeight: "300px",
    },
    contactSelect: {
      margin: "30px 0",
    },
  })
);

const AddCommentDialiog = (props: AddCommentDialogProps) => {
  const [isDialogOpen, setisDialogOpen] = React.useState(false);
  const [contactOfComment, setcontactOfComment] = useState("");
  const [comment, setComment] = useState("");
  const classes = useStyles();

  const handleAddCommentBtnClick = (event: React.MouseEvent) => {
    setisDialogOpen(true);
  };

  const handleCloseCommentDialog = (event: React.MouseEvent) => {
    setComment("");
    setcontactOfComment("");
    setisDialogOpen(false);
  };
  const handleCommentAdded = async () => {
    const commentToSend = { contact: contactOfComment, description: comment };
    const response = await fetchApi(
      `/companies/${props.companyId}/comments`,
      "POST",
      JSON.stringify(commentToSend)
    );
    if (response.success) {
      setisDialogOpen(false);
      props.onAddedComment();
    } else {
      alert(response.error);
    }
  };

  const handleSelectContactOfComment = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setcontactOfComment(event.target.value as string);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleAddCommentBtnClick}
      >
        <div style={{ margin: "0 5px" }}> ajouter</div>
        <AddCircleRounded fontSize="default" style={{ cursor: "pointer" }} />
      </Button>

      <Dialog
        open={isDialogOpen}
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        fullWidth={true}
        onClose={handleCloseCommentDialog}
        aria-labelledby="add-comment-dialog"
      >
        <DialogTitle id="add-comment-alert-dialog-title">
          {"Ajouter un commentaire"}
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Contact</InputLabel>
            <Select
              className={classes.contactSelect}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={contactOfComment}
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
              className={classes.commentTextField}
              theme="snow"
              value={comment}
              onChange={setComment}
            ></ReactQuill>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseCommentDialog}
            color="secondary"
            autoFocus
          >
            Annuler
          </Button>
          <Button
            onClick={handleCommentAdded}
            color="primary"
            variant="contained"
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCommentDialiog;
