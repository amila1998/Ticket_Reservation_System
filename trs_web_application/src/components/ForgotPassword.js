import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const handleForgotPassword = async (e) => {
    
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
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            NIC/Passport Number
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="787141785V"
            onChange={(e) => setNic(e.target.value)}
          />
        </div>
        <label for="exampleFormControlInput2" class="form-label">
          Email
        </label>
        <input
          type="email"
          id="exampleFormControlInput2"
          class="form-control"
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
  )    
 
};

export default ForgotPassword;
