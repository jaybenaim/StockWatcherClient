import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Layout/NavBar";

import Home from "./Pages/Home/Home";
import PrivateRoute from "./components/Auth/PrivateRoute/PrivateRoute";
import SignIn from "components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import AdminHome from "./Pages/Admin/AdminHome/AdminHome";
import WatchStock from "./Pages/WatchStock/WatchStock";
import { connect, useDispatch } from "react-redux";
import ForgotPassword from "components/Auth/ForgotPassword/ForgotPassword";
import { SET_WINDOW_WIDTH } from "redux-store/types";
import PropTypes from "prop-types";
import { checkDbStatus } from "redux-store/actions/generalActions";

const App = (props) => {
  const { dbStatus } = props
  const dispatch = useDispatch()
  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({title: '', body: ''});
  // const [isTokenFound, setTokenFound] = useState(false);
  // getToken(setTokenFound);

  // onMessageListener().then(payload => {
  //   setShow(true);
  //   setNotification({title: payload.notification.title, body: payload.notification.body})
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));

  useEffect(() => {
    dbStatus.status !== 'active' && props.checkDbStatus()
    // eslint-disable-next-line
  }, [])

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
  showSearchFilters: PropTypes.bool,
  checkDbStatus: PropTypes.func,
  dbStatus: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    showSearchFilters: state.general.showSearchFilters,
    dbStatus: state.general.dbStatus
  }
};



export default connect(mapStateToProps, { checkDbStatus })(App);
