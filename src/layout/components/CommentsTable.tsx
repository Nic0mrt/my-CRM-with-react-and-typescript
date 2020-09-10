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
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import ModifyIcon from "@material-ui/icons/Create";

import {} from "../../utils/fetchAPI";

import { Comment } from "../../models/Comment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  titleh6: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0",
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
}

const CommentsTable = (props: Props) => {
  const classes = useStyles();
  const [comments, setComments] = React.useState(props.comments);

  return (
    <div>
      <Typography color="primary" variant="h6" className={classes.titleh6}>
        Commentaires
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {comments.map((comment, index) => (
              <TableRow key={index} hover>
                <TableCell component="th" scope="row">
                  {comment.date}
                </TableCell>
                <TableCell align="right">{comment.contact}</TableCell>
                <TableCell align="left">{comment.description}</TableCell>

                <TableCell align="right">
                  <ModifyIcon
                    key={index}
                    className={classes.modifyIcon}
                    color="primary"
                    onClick={() => {
                      console.log(index);
                    }}
                  />

                  <CancelIcon
                    className={classes.deleteButton}
                    color="secondary"
                    onClick={() => {
                      console.log(index);
                    }}
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

export default CommentsTable;
