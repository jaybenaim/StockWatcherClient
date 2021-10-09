import React, { useEffect, useState } from "react";
import { getToken, onMessageListener } from 'config/firebase';
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Layout/NavBar";

import Home from "./Pages/Home/Home";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import SignIn from "components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import WatchStock from "./Pages/WatchStock/WatchStock";
import { connect, useDispatch } from "react-redux";
import ForgotPassword from "components/Auth/ForgotPassword/ForgotPassword";
import { SET_WINDOW_WIDTH } from "redux-store/types";
import PropTypes from "prop-types";
import { Alert } from "@material-ui/lab";
import { Button, Snackbar } from "@material-ui/core";

const App = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);

  onMessageListener().then(payload => {
    setShow(true);
    setNotification({title: payload.notification.title, body: payload.notification.body})
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  useEffect(() => {
    dispatch({ type: SET_WINDOW_WIDTH })

    window.addEventListener('resize', () => dispatch({ type: SET_WINDOW_WIDTH }))

    return () => window.removeEventListener('resize', () => dispatch({ type: SET_WINDOW_WIDTH }))
    // eslint-disable-next-line
  },[])

  return (
    <React.Fragment>
      <NavBar />

      <Snackbar open={show} autoHideDuration={6000} onClose={() => setShow(false)}>
          <Alert severity="error" onClose={() => setShow(false)}>
            {notification.title}
            {notification.body}
          </Alert>
      </Snackbar>

      {isTokenFound && (<h1> Notification permission enabled 👍🏻 </h1>)}
      {!isTokenFound && (<h1> Need notification permission ❗️ </h1>)}

      <Button onClick={() => setShow(true)}>Show Toast</Button>
      <Switch>
        <PrivateRoute exact path="/admin">
          <AdminHome />
        </PrivateRoute>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/search/:symbol" component={WatchStock} />
      </Switch>
    </React.Fragment>
  );
};

App.propTypes = {
  showSearchFilters: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    showSearchFilters: state.general.showSearchFilters
  }
};

export default connect(mapStateToProps, {})(App);
