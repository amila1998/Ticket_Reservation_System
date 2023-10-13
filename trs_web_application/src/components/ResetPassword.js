//components/ResetPassword.js

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAxiosInstance } from "../utils/axios";
import { AutherizationAPI } from "../utils/api";
import logo from "../assets/train.png";

// Define the ResetPassword component
export const ResetPassword = () => {
  // Define state variables for password and confirmPassword
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Get the 'token' parameter from the route
  const { token } = useParams();

  // Function to handle the password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords are not matched", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const res = await getAxiosInstance().put(
          AutherizationAPI.reset_password,
          { password: password },
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        toast.success(
          "Password reset completed. Please login again with your new password",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        window.location.href = "/";
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: ResetPassword.js:18 ~ handleResetPassword ~ error:",
        error
      );
      toast.error(error.response ? error.response.data : error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // Return the ResetPassword component JSX

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
       <div className="auth">
      <center>
        <img width={150} src={logo} />
      </center>
      <div className="container">
        <div className="row justify-content-center"></div>
      <div style={{ margin: "auto", alignItems: "center", padding: "5px" }}>
        <div
          style={{
            margin: "auto",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h2>Reset Password</h2>
          <h6>The Token is valid only in 10 minutes</h6>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="inputPassword6" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword6"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <label htmlFor="inputPassword7" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            id="inputPassword7"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <br />
          <center>
            <button onClick={handleResetPassword} className="btn btn-primary">
              Reset Password
            </button>
          </center>
        </form>
      </div>
      </div>
      </div>
    </>
  );
};
