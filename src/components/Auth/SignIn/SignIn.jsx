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
  const [errors, setErrors] = useState([]);

  const signInWithProvider = (event, provider) => {
    event.preventDefault()
    let userEmail = email.length >= 1 ? email : "";
    let userPassword = password.length >= 1 ? password : "";

    firebase
      .login({
        provider: provider === "email" ? null : provider,
        type: "popup",
        email: userEmail,
        password: userPassword,
      })
      .then(() => {
        history.push("/admin");
      })
      .catch((err) => {
        if (err.code.includes("account-exists")) {
          setErrors([...errors, "Account Exists"]);
        }
      });
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

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="sign-in--email primary-bg"
            onClick={(event) => signInWithProvider("email")}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link to="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
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