import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleResetPassword = () =>{

    }
  
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
            style={{
              margin: "auto",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <h2>Reset Password</h2>
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
      </>
    );  
}
