import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PaymentSuccessModal({ open, onClose }) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      aria-labelledby="payment-success-modal"
      aria-describedby="payment-success-description"
    >
      <div className={classes.paper}>
        <h2 id="payment-success-modal">Payment Successful</h2>
        <p id="payment-success-description">Your payment was successful. Thank you for your order!</p>
      </div>
    </Modal>
  );
}
