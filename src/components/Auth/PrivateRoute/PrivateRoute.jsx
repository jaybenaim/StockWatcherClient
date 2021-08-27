import React, { useState } from "react";
// eslint-disable-next-line
import { Route } from "react-router-dom";
import Home from "../../Home/Home";
import { useSelector } from "react-redux";

function PrivateRoute({ role, children: Component, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);

  const [showAlert, setShowAlert] = useState(true);
  if (role === undefined) {
    role = false;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isEmpty ? (
          Component
        ) : showAlert ? (
          <>
            <div className="alert alert-danger login-alert" role="alert">
              Please login first!
              <button
                className="btn-success alert-close-btn"
                onClick={() => setShowAlert(false)}
              >
                X
              </button>
            </div>
          </>
        ) : (
          <Home {...props} />
        )
      }
    />
  );
}
export default PrivateRoute;

/// create component with alert message to login
