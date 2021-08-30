﻿import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Layout/NavBar";

import Home from "./components/Pages/Home/Home";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import SignIn from "components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import WatchStock from "./components/Pages/WatchStock/WatchStock";
import { connect } from "react-redux";

const App = () => {

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
        <Route exact path="/search/:symbol" component={WatchStock} />
      </Switch>
    </React.Fragment>
  );
};

App.propTypes = {
}

const mapStateToProps = (state) => {
  return {}
};

export default connect(mapStateToProps, {})(App);
