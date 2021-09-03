import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
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
  const [errors, setErrors] = useState({
    "email": "",
    "password": "",
    "error": ""
  });

  const signInWithProvider = async (event, provider) => {
    event.preventDefault()
    let userEmail = email.length >= 1 ? email : "";
    let userPassword = password.length >= 1 ? password : "";
    if (provider === "email") {
      try {
        const response = await firebase
          .createUser({
            email,
            password,
          })

      console.log(response)
      const token = await firebase.auth().currentUser.getIdToken()
      localStorage.setItem('fb-token', token)
      history.push("/");
    } catch (err) {
        if (err.code?.includes('email')) {
          setErrors({
            "email": err.message,
            "password": errors.password,
            "error": errors.error
          });
        } else if (err.code?.includes('password')) {
          setErrors({
            "email": errors.email,
            "password": err.message,
            "error": errors.error
          });
        } else {
          setErrors({
            "email": errors.email,
            "password": errors.password,
            "error": err.message,
          });
        }
      }
    } else {
      try {
        const response = await firebase
          .login({
            provider: provider,
            type: "popup",
            email: userEmail,
            password: userPassword,
          })

        console.log(response)
        const token = await firebase.auth().currentUser.getIdToken()
        localStorage.setItem('fb-token', token)
        history.push("/");
    } catch (err) {
        if (err.code?.includes('email')) {
          setErrors({
            "email": err.message,
            "password": errors.password,
            "error": errors.error
          });
        } else if (err.code?.includes('password')) {
          setErrors({
            "email": errors.email,
            "password": err.message,
            "error": errors.error
          });
        } else {
          setErrors({
            "email": errors.email,
            "password": errors.password,
            "error": err.message,
          });
        }
      }
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
          <fieldset>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={errors.email.length < 1 ? "Email Address" : "Email ERROR"}
                helperText={errors.email.length > 0 && errors.email}
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email.length > 0}
              />
          </fieldset>

          <fieldset>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label={errors.password.length < 1 ? "Password" : "Password ERROR"}
              helperText={errors.password.length > 0 && errors.password}
              id="password"
              autoComplete="current-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password.length > 0}
            />
          </fieldset>

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
              <Link to="/sign-in">
                <Typography
                  component="p"
                  variant="subtitle1"
                  className="display-center"
                >
                  Already have an account?
                  <Button
                    variant="text"
                    color="primary"
                    className="ml-2">
                      Sign In
                  </Button>
                </Typography>
              </Link>
            </Grid>

          <Grid item xs={12} className="display-center mt-2">
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
          </Grid>
        </form>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}