import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Grid,
  Box,
  Typography,
  Container,
  Checkbox
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from 'components/Copyright/Copyright';
import { useFirebase } from "react-redux-firebase";
import { useHistory, Link } from "react-router-dom";
import "../Auth.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const firebase = useFirebase();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const signInWithProvider = async (event, provider) => {
    event.preventDefault()
    let userEmail = email.length >= 1 ? email : "";
    let userPassword = password.length >= 1 ? password : "";
    if (provider === "email") {
      await firebase
        .createUser({
          email,
          password,
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          if (err.code.includes("account-exists")) {
            setErrors([...errors, "Account Exists"]);
          }
        });
    } else {
      await firebase
        .login({
          provider: provider === "email" ? null : provider,
          type: "popup",
          email: userEmail,
          password: userPassword,
        })
        .then(() => {
          history.push("/");
        })
        .catch((err) => {
          if (err.code.includes("account-exists")) {
            setErrors([...errors, "Account Exists"]);
          }
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className="lock-icon">
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="sign-in--email primary-bg"
            onClick={(event) => signInWithProvider(event, "email")}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

          <Grid item xs={12} className="display-center p-2">
              <Button
                variant="contained"
                className="sign-in--google primary-bg"
                onClick={(event) => signInWithProvider(event, "google")}
              >
                <i className="fa fa-google" aria-hidden="true"></i>

                <span className="pl-1">
                  Sign Up with Google
                </span>
              </Button>
            </Grid>
        </form>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}