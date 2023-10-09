import React, { useState } from "react";
import profile from "../assets/profile_picture.jpg";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin user profile submitted:", user);
  };

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: "#FFF",
          padding: "10px",
          borderRadius: "20px",
          height: "auto",
          opacity: "88%",
        }}
      >
        <div class="container text-center">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4">
              <h1 style={{ color: "#000000" }}>Admin User Profile</h1>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4"></div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <img
                src={profile}
                width={150}
                height={150}
                style={{ borderRadius: "500px" }}
              ></img>
            </div>
          </div>
        </div>
        <div class="container" style={{ padding: "35px" }}>
          <div class="row">
            <div class="mb-3">
              <label
                for="formGroupExampleInput"
                class="form-label"
                style={{ color: "#000000" }}
              >
                Name
              </label>
              <input
                class="form-control"
                type="text"
                value="Disabled readonly input"
                aria-label="Disabled input example"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label
                for="formGroupExampleInput2"
                class="form-label"
                style={{ color: "#000000" }}
              >
                Password
              </label>
              <input
                class="form-control"
                type="text"
                value="Disabled readonly input"
                aria-label="Disabled input example"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label
                for="formGroupExampleInput2"
                class="form-label"
                style={{ color: "#000000" }}
              >
                Role
              </label>
              <input
                class="form-control"
                type="text"
                value="Disabled readonly input"
                aria-label="Disabled input example"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label
                for="formGroupExampleInput2"
                class="form-label"
                style={{ color: "#000000" }}
              >
                NIC
              </label>
              <input
                class="form-control"
                type="text"
                value="Disabled readonly input"
                aria-label="Disabled input example"
                disabled
                readonly
              />
            </div>
            <div class="mb-3">
              <label
                for="formGroupExampleInput2"
                class="form-label"
                style={{ color: "#000000" }}
              >
                Contact Number
              </label>
              <input
                class="form-control"
                type="text"
                value="Disabled readonly input"
                aria-label="Disabled input example"
                disabled
                readonly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
