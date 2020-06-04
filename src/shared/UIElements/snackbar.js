import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}