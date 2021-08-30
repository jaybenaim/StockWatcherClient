import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Layout/NavBar";

import Home from "./components/Pages/Home/Home";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import WatchStock from "./components/Pages/WatchStock/WatchStock";

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <PrivateRoute exact path="/admin">
          <AdminHome />
        </PrivateRoute>
        <Route path="/" component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/search/:symbol" component={WatchStock} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
