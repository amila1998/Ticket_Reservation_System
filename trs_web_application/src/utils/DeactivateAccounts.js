import React from 'react'
import deactive from '../assets/deactive.png'
import { useSelector } from 'react-redux';

const DeactivateAccounts = () => {
      const user = useSelector((state) => state.auth.user);
      const token = useSelector((state) => state.auth.token);
  return (
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
          <button className="btn btn-primary">Activate Now</button>
        )}
      </center>
    </div>
  );
}

export default DeactivateAccounts