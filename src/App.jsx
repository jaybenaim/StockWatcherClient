import React, { useEffect } from "react";
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

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: SET_WINDOW_WIDTH })

    window.addEventListener('resize', () => dispatch({ type: SET_WINDOW_WIDTH }))

    return () => window.removeEventListener('resize', () => dispatch({ type: SET_WINDOW_WIDTH }))
    // eslint-disable-next-line
  },[])

  return (
    <React.Fragment>
      <NavBar />

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
