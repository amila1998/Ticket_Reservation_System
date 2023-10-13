import React, { useRef, useState } from "react";
import profile from "../assets/profile_picture.jpg";
import { useSelector } from "react-redux";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import photo_icon from "../assets/icons/camera-retro-solid.svg";
const Profile = () => {
  const inputFile = useRef(null);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isUserEdit, setIsUserEdit] = useState(false);
  console.log("🚀 ~ file: Profile.js:15 ~ Profile ~ isUserEdit:", isUserEdit)
  const loginUser = useSelector((state) => state.auth.user);

  const handleInput = () => {
    inputFile.current.click();
  };
  
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
            {!isUserEdit ? (
              <div class="col-xs-12 col-sm-12 col-md-4">
                <img
                  src={profile}
                  width={150}
                  height={150}
                  style={{ borderRadius: "500px" }}
                ></img>
              </div>
            ) : (
              <div class="col-xs-12 col-sm-12 col-md-4" onClick={handleInput}>
                <img
                  src={profile}
                  width={150}
                  height={150}
                  style={{ borderRadius: "500px" }}
                ></img>
                <input
                  name="train image"
                  ref={inputFile}
                  type="file"
                  className="profile_avatar-input"
                  id="imageUpload"
                  accept="image/*"
                  // onChange={handleImageChange}
                />
              </div>
            )}
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
                defaultValue={loginUser.name}
                aria-label="Disabled input example"
                disabled={!isUserEdit}
                readonly={!isUserEdit}
              />
            </div>
            {isUserEdit && (
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
                  // value="Disabled readonly input"
                  defaultValue="test"
                  aria-label="Disabled input example"
                />
              </div>
            )}
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
                defaultValue={loginUser.role}
                aria-label="Disabled input example"
                disabled={!isUserEdit}
                readonly={!isUserEdit}
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
                defaultValue={loginUser.nic}
                aria-label="Disabled input example"
                disabled={!isUserEdit}
                readonly={!isUserEdit}
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
                defaultValue={loginUser.contactNo}
                aria-label="Disabled input example"
                disabled={!isUserEdit}
                readonly={!isUserEdit}
              />
            </div>
            <center>
              {!isUserEdit ? (
                <div
                  onClick={() => {
                    setIsUserEdit(true);
                  }}
                  className="btn"
                  style={{
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "50px",
                    justifyContent: "center",
                    backgroundColor: "rgb(212, 194, 2)",
                    alignItems: "center",
                    display: "flex",
                    width: "30%",
                  }}
                >
                  <center>
                    <img
                      style={{
                        margin: "10px",
                      }}
                      width={18}
                      src={edit_icon}
                    />
                  </center>
                  <h6 style={{ margin: "10px", color: "#FFF" }}>
                    Edit Profile
                  </h6>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setIsUserEdit(true);
                  }}
                  className="btn"
                  style={{
                    cursor: "pointer",
                    margin: "5px",
                    borderRadius: "50px",
                    justifyContent: "center",
                    backgroundColor: "rgb(212, 194, 2)",
                    alignItems: "center",
                    display: "flex",
                    width: "30%",
                  }}
                >
                  <h6 style={{ margin: "10px", color: "#FFF" }}>Submit</h6>
                </div>
              )}
            </center>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
