// components/ForgotPassword.js
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAxiosInstance } from "../utils/axios";
import { AuthenticationAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // Define state variables for NIC and email
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Handle the password reset request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await getAxiosInstance().post(
        AuthenticationAPI.forgot_password,
        {
          nic,
          email,
        }
      );
      const token = res.data.token;
      toast.success("Your request send successfully !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/resetPassword/${token}`);
    } catch (error) {
      console.log(
        "🚀 ~ file: ForgotPassword.js:12 ~ handleForgotPassword ~ error:",
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
      <div style={{ margin: "auto", alignItems: "center", padding: "5px" }}>
        <div
          style={{ margin: "auto", alignItems: "center", textAlign: "center" }}
        >
          <h2>Forgot Password</h2>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              NIC/Passport Number
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="787141785V"
              onChange={(e) => setNic(e.target.value)}
            />
          </div>
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="exampleFormControlInput2"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <br />
          <center>
            <button onClick={handleForgotPassword} className="btn btn-primary">
              Forgot Password
            </button>
          </center>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
