import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export const ErrorAlert = (props) => (
  <Snackbar
    open={props.open}
    onClose={props.onClose}
    autoHideDuration={6000}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <MuiAlert elevation={6} variant='filled' severity='error'>
      {props.children}
    </MuiAlert>
  </Snackbar>
);
