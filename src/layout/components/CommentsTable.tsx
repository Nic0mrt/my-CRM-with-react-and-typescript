import React, { useEffect } from "react";
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
import { fetchApi } from "../../utils/fetchAPI";
import { Comment } from "../../models/Comment";
import AddCommentDialiog from "./AddCommentDialog";
import CommentDialog from "./CommentDialog";
import { Contact } from "../../models/Contact";

const formatDateToString = (date: Date): string => {
  const dateToFormat = new Date(date);
  const day =
    dateToFormat.getDate() < 9
      ? "0" + dateToFormat.getDate()
      : dateToFormat.getDate();
  const month =
    dateToFormat.getMonth() < 9
      ? "0" + (dateToFormat.getMonth() + 1)
      : dateToFormat.getMonth() + 1;
  const year = dateToFormat.getFullYear();

  return `${day}/${month}/${year}`;
};

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
  comments: [Comment];
  company_id: string;
  contacts: [Contact];
}

const CommentsTable = (props: Props) => {
  const classes = useStyles();
  const [comments, setComments] = React.useState(props.comments);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = React.useState(false);
  const [commentSelected, setCommentSelected] = React.useState<Comment>();

  const handleDeleteCommentClick = async (event: React.MouseEvent) => {
    const commentId = event.currentTarget.id;
    const response = await fetchApi(`/comments/${commentId}`, "DELETE", null);
    if (response.success) {
      setComments(response.data);
    } else {
      alert(response.error);
    }
  };

  const handleModifyCommentClick = (event: React.MouseEvent) => {
    setIsCommentDialogOpen(true);
  };

  const handleAfterCommentAdded = () => {
    getAllCommentsOfCompany();
  };

  const getAllCommentsOfCompany = async () => {
    const response = await fetchApi(
      `/companies/${props.company_id}/comments`,
      "GET",
      null
    );

    if (response.success) {
      setComments(response.data);
    } else {
      alert(response.error);
    }
  };

  const handleOnClosedCommentDialog = () => {
    setIsCommentDialogOpen(false);
  };

  const handleOnSavedComment = () => {
    getAllCommentsOfCompany();
  };

  useEffect(() => {
    console.log("mount");
    return () => {};
  }, []);

  return (
    <div>
      <Typography color="primary" variant="h6" className={classes.titleh6}>
        Commentaires
        <AddCommentDialiog
          companyId={props.company_id}
          onAddedComment={handleAfterCommentAdded}
          contacts={props.contacts}
        />
      </Typography>
      <TableContainer
        component={Paper}
        style={{ maxHeight: 440, marginBottom: 30 }}
      >
        <Table
          stickyHeader
          className={classes.table}
          size="small"
          aria-label="dense table of comments"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "100px" }}>
                <Typography>Date</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Contact</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>Commentaire</Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {comments.map((comment, index) => (
              <TableRow key={index} hover>
                <TableCell component="th" scope="row">
                  {formatDateToString(comment.date)}
                </TableCell>
                <TableCell align="right">{comment.contact}</TableCell>
                <TableCell align="left">
                  {
                    <div
                      dangerouslySetInnerHTML={{ __html: comment.description }}
                    ></div>
                  }
                </TableCell>

                <TableCell align="right">
                  <ModifyIcon
                    id={comment._id}
                    className={classes.modifyIcon}
                    color="primary"
                    onClick={() => {
                      console.log(comment);

                      setCommentSelected(comment);
                      setIsCommentDialogOpen(true);
                    }}
                  />

                  <CancelIcon
                    id={comment._id}
                    className={classes.deleteButton}
                    color="secondary"
                    onClick={handleDeleteCommentClick}
                  />

                  {isCommentDialogOpen && commentSelected ? (
                    <CommentDialog
                      comment={commentSelected}
                      contacts={props.contacts}
                      onClose={handleOnClosedCommentDialog}
                      onSaveComment={handleOnSavedComment}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CommentsTable;
