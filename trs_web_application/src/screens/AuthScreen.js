//screens/Auth.js
// Define the AuthScreen component
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Login from "../components/Login";
import ForgotPassword from "../components/ForgotPassword";
import logo from "../assets/train.png";

const AuthScreen = () => {
  // Define state to toggle between login and forgot password screens
  const [showLogin, setShowLogin] = useState(true);

  // Handle the toggle between login and forgot password screens
  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="auth">
      <center>
        <img width={150} src={logo} />
      </center>
      <div className="container">
        <div className="row justify-content-center">
          <div className="">
            <CSSTransition
              in={showLogin}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <div className="slide">
                <Login />
              </div>
            </CSSTransition>
            <CSSTransition
              in={!showLogin}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <div className="slide">
                <ForgotPassword />
              </div>
            </CSSTransition>
          </div>
          <div onClick={handleToggle} className="divButton">
            {showLogin ? "Forget Password" : "Back to Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
