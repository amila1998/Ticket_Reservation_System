import React, { useRef, useState } from "react";
import profile from "../assets/profile_picture.jpg";
import { useSelector } from "react-redux";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import photo_icon from "../assets/icons/camera-retro-solid.svg";
import { getAxiosInstance } from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AutherizationAPI, ImageAPI, UserManagementAPI } from "../utils/api";
import close_icon from "../assets/icons/wrong-svgrepo-com.svg";

const Profile = () => {
  const inputFile = useRef(null);
  const token = useSelector((state) => state.auth.token);


  const [isUserEdit, setIsUserEdit] = useState(false);
  console.log("🚀 ~ file: Profile.js:15 ~ Profile ~ isUserEdit:", isUserEdit)
  const loginUser = useSelector((state) => state.auth.user);

    const [user, setUser] = useState({
      name: loginUser.name,
      imagePath: loginUser.imagePath,
      contactNo: loginUser.contactNo,
    });

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

  const handleSubmit = async(e) => {
    try {
       const res = await getAxiosInstance().put(
          AutherizationAPI.update_profile,
         user,
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        setIsUserEdit(false);
        toast.success(
          "User Profile Update Successfull",
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
        window.location.href = "/profile";
      
    } catch (error) {
      console.log("🚀 ~ file: Profile.js:43 ~ handleSubmit ~ error:", error)
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

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          let formData = new FormData();
          formData.append("files", file);

          // upload to cloudinary
          const res = await getAxiosInstance().post(ImageAPI.uplaod, formData, {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `bearer ${token}`,
            },
            
            onUploadProgress: (x) => {
              if (x.total < 1024000)
                return toast("Uploading", {
                  className: "bg-upload",
                  bodyClassName: "bg-upload",
                  autoClose: 7000,
                });
            },
          });
        setUser({
          ...user,
          imagePath: res.data
        });
        } catch (err) {
          toast(err.response.data.msg, {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const deactivateAccount = async()=>{
    try {
       const res = await getAxiosInstance().put(
         UserManagementAPI.deactivate_user+"/"+loginUser.nic,
         null,
         {
           headers: { Authorization: `bearer ${token}` },
         }
       );
       setIsUserEdit(false);
       toast.success("User Account Deactivated", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
       window.location.href = "/";
    } catch (error) {
       console.log(
         "🚀 ~ file: Profile.js:124 ~ deactivateAccount ~ error:",
         error
       );
       toast.error(error.response ? error.response.data : error.message, {
         position: "top-left",
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
              <h1 style={{ color: "#000000" }}></h1>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4"></div>
            {isUserEdit ? (
              <div className="mb-3">
                <div className="profile_avatar">
                  <div className="profile_avatar-wrapper" onClick={handleInput}>
                    <div className="avatar">
                      <img
                        className="profile_avatar-wrapper_img"
                        src={user.imagePath}
                        alt="Train Image"
                      />
                    </div>
                    <img
                      className="profile_avatar-wrapper_svg"
                      src={photo_icon}
                    />
                  </div>
                  <input
                    name="train image"
                    ref={inputFile}
                    type="file"
                    className="profile_avatar-input"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-3">
                <div className="profile_avatar">
                  <div className="profile_avatar-wrapper">
                    <div className="avatar">
                      <img
                        className="profile_avatar-wrapper_img"
                        src={user.imagePath}
                        alt="Train Image"
                      />
                    </div>
                  </div>
                </div>
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
                defaultValue={user.name}
                aria-label="Disabled input example"
                disabled={!isUserEdit}
                readonly={!isUserEdit}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
            </div>
            {/* {isUserEdit && (
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
            )} */}
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
                disabled={true}
                readonly={true}
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
                disabled={true}
                readonly={true}
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
                defaultValue={user.contactNo}
                aria-label="Disabled input example"
                disabled={!isUserEdit}
                readonly={!isUserEdit}
                onChange={(e) => {
                  setUser({ ...user, contactNo: e.target.value });
                }}
              />
            </div>
            <center>
              {loginUser.nic != "000000000V" && (
                <>
                  {!isUserEdit ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        onClick={() => {
                          deactivateAccount()
                        }}
                        className="btn"
                        style={{
                          cursor: "pointer",
                          margin: "5px",
                          borderRadius: "50px",
                          justifyContent: "center",
                          backgroundColor: "rgb(156, 34, 22)",
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
                            src={close_icon}
                          />
                        </center>
                        <h6 style={{ margin: "10px", color: "#FFF" }}>
                          Deactivate Account
                        </h6>
                      </div>
                      <div
                        onClick={() => {
                          setIsUserEdit(true);
                          setUser({
                            ...user,
                            name: loginUser.name,
                            imagePath: loginUser.imagePath,
                            contactNo: loginUser.contactNo,
                          });
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
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        onClick={() => {
                          handleSubmit();
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
                        <h6 style={{ margin: "10px", color: "#FFF" }}>
                          Submit
                        </h6>
                      </div>
                      <div
                        onClick={() => {
                          setIsUserEdit(false);
                        }}
                        className="btn"
                        style={{
                          cursor: "pointer",
                          margin: "5px",
                          borderRadius: "50px",
                          justifyContent: "center",
                          backgroundColor: "rgb(163, 153, 152)",
                          alignItems: "center",
                          display: "flex",
                          width: "30%",
                        }}
                      >
                        <h6 style={{ margin: "10px", color: "#FFF" }}>
                          Go Back
                        </h6>
                      </div>
                    </div>
                  )}
                </>
              )}
            </center>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
