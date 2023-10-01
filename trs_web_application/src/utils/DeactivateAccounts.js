import React from 'react'
import deactive from '../assets/deactive.png'
import { useSelector } from 'react-redux';
import { UserManagementAPI } from './api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAxiosInstance } from './axios';

const DeactivateAccounts = () => {
      const user = useSelector((state) => state.auth.user);
      const token = useSelector((state) => state.auth.token);

      const sendActiveStatus =async(e)=>{
       e.preventDefault();
       try {
         const res = await getAxiosInstance().put(
           UserManagementAPI.user_activate_request+`/${user.nic}`,
            null,
           {
             headers: { Authorization: `bearer ${token}` },
           }
         );
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
         window.location.href= "/"
       } catch (error) {
         console.log(
           "🚀 ~ file: DeactivateAccounts.js:13 ~ sendActiveStatus ~ error:",
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
      <div style={{ padding: "20px", marging: "auto" }}>
        <center>
          <img width={"20%"} src={deactive}></img>
          <br />
          <br />
          <h2>Your account is deactivated !</h2>
          {user.isSendActiveStatus ? (
            <>
              <h5>
                Your profile activation request already send to the backoffice.{" "}
              </h5>
              <h5>When we activated, we will notify through your email.</h5>
            </>
          ) : (
            <button className="btn btn-primary" onClick={sendActiveStatus}>
              Activate Now
            </button>
          )}
        </center>
      </div>
    </>
  );
}

export default DeactivateAccounts