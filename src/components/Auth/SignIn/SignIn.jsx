import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory, Link } from "react-router-dom";
import Notifications from "../../Notifications/Notifications";

import "../../../assets/stylesheets/signin.css";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const signInWithProvider = (provider) => {
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
  const errorElements = () =>
    errors.map((error, i) => <div key={i}>{error}</div>);

  return (
    <div className="login__page">
      {errors.length >= 1 && (
        <Notifications
          type={"alert"}
          variant={"danger"}
          heading={"Error"}
          body={errorElements()}
        />
      )}
      <div className="container">
        <div className="row">
          <div className="card col-md-4 col-md-offset-4">
            <div className="login__card">
              <div className="card-block">
                <form name="userform" method="post">
                  <h3>Log In </h3>
                  <Link to="sign-up">Sign up</Link>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      name="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="buton"
                      className="btn btn-primary btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("email");
                      }}
                    >
                      Login with Email
                    </button>
                  </div>

                  <div className="form-group">
                    <button
                      type="buton"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("facebook");
                      }}
                    >
                      <i className="fa fa-facebook" aria-hidden="true"></i>
                      Login with Facebook
                    </button>

                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("twitter");
                      }}
                    >
                      <i className="fa fa-twitter" aria-hidden="true"></i>
                      Login with Twitter
                    </button>

                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("github");
                      }}
                    >
                      <i className="fa fa-github" aria-hidden="true"></i>
                      Login with Github
                    </button>

                    <button
                      type="button"
                      className="btn btn-block"
                      onClick={(event) => {
                        event.preventDefault();
                        signInWithProvider("google");
                      }}
                    >
                      <i className="fa fa-google" aria-hidden="true"></i>
                      Login with Google
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
