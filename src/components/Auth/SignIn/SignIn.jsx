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
import { useFirebase } from "react-redux-firebase";
import { useHistory, Link } from "react-router-dom";
// import Notifications from "../../General/Notifications/Notifications";
import "../Auth.scss";
import Copyright from 'components/Copyright/Copyright';
import { Alert, AlertTitle } from '@material-ui/lab';
import local from 'api/local';
import { auth } from 'config/firebase';

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

export default function SignIn() {
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

    try {
      const response = await firebase
      .login({
        provider: provider === "email" ? null : provider,
        type: "popup",
        email: userEmail,
        password: userPassword,
      })
      const token = await auth.currentUser.getIdToken(true)
      localStorage.setItem('fb-token', token)

      const {email, displayName = ""} = response.user

      if (token) {
        try {
          const newUser = await local.post('/users/', {
            username: displayName || email,
            email: email
          })

          if (newUser.data.id) {
            const profile = newUser.data.profile

            profile.displayName = profile.display_name
            delete profile.display_name

             await firebase.updateProfile({
              ...profile
            })
          }

          if (newUser.status !== 500) {
            history.push("/admin");
          } else if (newUser.status === 400) {
            setErrors({
              ...errors,
              "error": "User already exists."
            });
          }
        } catch (err) {
          const errorMsg = err.response?.data || ""
          if ((errorMsg).toLowerCase().includes('username')) {
            setErrors({
              ...errors,
              "email": errorMsg
            });
          } else {
            setErrors({
              ...errors,
              "error": err.message ? err.message : "Something wrong with the username you provided."
            });
          }
        }
      }
    } catch(err) {
      console.log(`Error: ${err.message}`)
      if (err.code?.includes('email')) {
        setErrors({
          "email": err.message,
          ...errors
        });
      } else if (err.code?.includes('password')) {
        setErrors({
          "password": err.message,
          ...errors
        });
      } else {
      setErrors({
        "error": err.message,
        ...errors,
      });
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
          Sign in
        </Typography>

        {errors.error.length > 0 && (
        <Alert severity="error" className="mt-2">
          <AlertTitle>Error</AlertTitle>
          {errors.error}
        </Alert>
        )}

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

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="sign-in--email primary-bg"
            onClick={(event) => signInWithProvider(event, "email")}
          >
            Sign In
          </Button>


          <Grid container>
            <Grid
              item
              xs={12}
            >
              <Link to="/forgot-password" variant="body2">
                <Typography component="p" variant="subtitle1">
                    Forgot Password?
                </Typography>
              </Link>
            </Grid>

            <Grid
              item
              xs={12}
              className="mt-2"
            >
              <Link to="/sign-up">
                <Typography
                  component="p"
                  variant="subtitle1"
                  className="display-center"
                >
                    Don&apos;t have an account?
                    <Button
                      variant="text"
                      color="primary"
                      className="ml-2">
                        Sign Up
                    </Button>
                </Typography>
              </Link>
            </Grid>

            <Grid item xs={12} className="display-center p-3">
              <Button
                variant="contained"
                className="sign-in--google primary-bg"
                onClick={(event) => signInWithProvider(event, "google")}
              >
                <i className="fa fa-google" aria-hidden="true"></i>

                <span className="pl-1">
                  Login with Google
                </span>
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
