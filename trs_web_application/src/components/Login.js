//component/Loging.js

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAxiosInstance } from "../utils/axios";
import { AuthenticationAPI } from "../utils/api";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Login = () => {
  // Define state variables for NIC and password
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Handle the user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await getAxiosInstance().post(AuthenticationAPI.login, {
        nic,
        password,
      });
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", res.data.token);
      dispatch(authActions.login(res.data.token));
      toast.info("Login Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("🚀 ~ file: Login.js:14 ~ handleLogin ~ error:", error);
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
          <h2>LOGIN</h2>
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
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
          <center>
            <button onClick={handleLogin} className="btn btn-primary">
              LOGIN
            </button>
          </center>
        </form>
      </div>
    </>
  );
};

export default Login;
