import React, { useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
// import Notifications from "../../General/Notifications/Notifications";
import "../Auth.scss";
import Copyright from 'components/Copyright/Copyright';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [successMessage, showSuccessMessage] = useState(false)

  const forgotPass = async (event) => {
    event.preventDefault()

    try {
     await firebase
        .auth()
        .sendPasswordResetEmail(email)
      showSuccessMessage(true)
    } catch(err) {
      console.log(err)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {successMessage ? (
          <Typography component="h1" variant="h5">
            Please check your email to reset your password
          </Typography>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Enter your email to reset your password
            </Typography>

            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="forgot-password--email primary-bg"
                onClick={(event) => forgotPass(event)}
              >
                Send email link
              </Button>
            </form>
          </>
        )}

        <Grid item className="pt-2">
          <Link to="/sign-in" variant="body2" className="forgot-password--back-to-sign-in space-between">
            <ArrowBackIcon />
              <span className="pl-1">
                <Typography component="h6" variant="h6">
                  Back to Sign In?
                </Typography>
              </span>
          </Link>
        </Grid>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}