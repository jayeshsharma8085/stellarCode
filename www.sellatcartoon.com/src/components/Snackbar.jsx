import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function ProdcutSnackbar(props) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setSnack(false);
  };

  return (
    <div>
      <Snackbar open={props.snack} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Product Added Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}