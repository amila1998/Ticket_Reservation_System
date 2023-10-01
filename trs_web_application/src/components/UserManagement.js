import React, { useEffect, useState } from "react";
import user_icon from "../assets/icons/user-solid.svg";
import plus_icon from "../assets/icons/plus-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import delete_icon from "../assets/icons/trash-solid.svg";
import Nodata from "../utils/Nodata";
import { getAxiosInstance } from "../utils/axios";
import { UserManagementAPI } from "../utils/api";
import { useSelector } from "react-redux";
import Loading from "../utils/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [callback, setCallback] = useState(true);
   const token = useSelector((state) => state.auth.token);
   const auth = useSelector((state) => state.auth.user);
   const [filterName,setFilterName]=useState("")
   const [filterRole,setFilterRole]=useState("")
   console.log("🚀 ~ file: UserManagement.js:23 ~ UserManagement ~ filterRole:", filterRole)
   const [filterIsActive,setFilterIsActive]=useState("")

   const [user, setUser] = useState({
     name: "",
     password: "000000",
     role: "traveler",
     nic: "",
     imagePath: "",
     contactNo: "",
     email: "",
   });
   

   const handleCreateModalClose =()=>{
    setUser({
      ...user,
      name: "",
      password: "000000",
      role: "traveler",
      nic: "",
      imagePath: "",
      contactNo: "",
      email: "",
    });
   }

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getAxiosInstance().get(UserManagementAPI.getAllUsers, {
        headers: { Authorization: `bearer ${token}` },
      });
      setUsers(res.data)     
      setIsLoading(false);
      setCallback(false);
    } catch (error) {
      setIsLoading(false);
      console.log(
        "🚀 ~ file: UserManagement.js:13 ~ getAllUsers ~ error:",
        error
      );
            toast.error(
              error.response.data ? error.response.data : error.message,
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
    }
  };

  useEffect(() => {
    callback && getAllUsers();
  }, [callback]);

  const createUser =async(e)=>{
    e.preventDefault();
    try {
      const res = await getAxiosInstance().post(
        UserManagementAPI.user_create,
        user,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
       toast.success("User created successfully !", {
         position: "top-left",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
      handleCreateModalClose()
      setCallback(true)
    } catch (error) {
      console.log("🚀 ~ file: UserManagement.js:70 ~ createUser ~ error:", error)
            toast.error(
              error.response.data ? error.response.data : error.message,
              {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
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
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div style={{ overflow: "auto" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <img width={15} src={user_icon} />
            <h5 style={{ marginLeft: "5px" }}>User Management</h5>
          </div>
          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "rgb(0, 0, 0,0.5)",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
                marginBottom: "10px",
                padding: "10px",
                flexWrap: "wrap",
              }}
            >
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput10"
                  className="form-label"
                >
                  Filter By Name
                </label>
                <input
                  value={filterName}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput10"
                  placeholder="Ex: Sean Udayantha"
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>{" "}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput11"
                  className="form-label"
                >
                  Filter By Role
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setFilterRole(e.target.value);
                  }}
                >
                  <option value="" selected>
                    All
                  </option>
                  <option value="traveler">Traveler</option>
                  <option value="travel_agent">Travel Agent</option>
                  <option value="backoffice">Backoffice</option>
                </select>
              </div>{" "}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput12"
                  className="form-label"
                >
                  Filter By Active Status
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setFilterIsActive(e.target.value)}
                >
                  <option value="" selected>
                    All
                  </option>
                  <option value={true}>Active</option>
                  <option value={false}>Deactive</option>
                </select>
              </div>
            </div>

            <div
              style={{
                cursor: "pointer",
                float: "right",
                borderRadius: "50px",
                justifyContent: "center",
                backgroundColor: "rgb(0, 163, 44)",
                alignItems: "center",
              }}
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <div
                data-toggle="tooltip"
                data-placement="bottom"
                title="Create user"
              >
                <center>
                  <img style={{ margin: "10px" }} width={25} src={plus_icon} />
                </center>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#ffff",
                    border: "none",
                    color: "#0000 !important",
                  }}
                  className="modal-content"
                >
                  <div className="modal-header">
                    <h5
                      style={{ color: "black" }}
                      className="modal-title"
                      id="exampleModalLongTitle"
                    >
                      {"Create New User"}
                    </h5>
                    <button
                      style={{
                        borderRadius: "50px",
                        backgroundColor: "red",
                        border: "none",
                        color: "#ffff",
                      }}
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleCreateModalClose}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div style={{ color: "black" }} className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Full Name
                        </label>
                        <input
                          value={user.name}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Sean Udayantha"
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2"
                          className="form-label"
                        >
                          NIC/Passport Number
                        </label>
                        <input
                          value={user.nic}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput2"
                          placeholder="787141785V"
                          onChange={(e) =>
                            setUser({ ...user, nic: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput3"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          value={user.password}
                          type="password"
                          className="form-control"
                          id="exampleFormControlInput3"
                          placeholder="787141785V"
                          disabled
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label"
                        >
                          Email
                        </label>
                        <input
                          value={user.email}
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="example@gmail.com"
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label"
                        >
                          Contact Number
                        </label>
                        <input
                          value={user.contactNo}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="0771234567"
                          onChange={(e) =>
                            setUser({ ...user, contactNo: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput6"
                          className="form-label"
                        >
                          Role
                        </label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            checked={user.role == "traveler"}
                            onChange={(e) =>
                              setUser({ ...user, role: "traveler" })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Traveler
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            disabled={
                              auth.role == "travel_agent" ||
                              auth.role == "traveler"
                            }
                            onChange={(e) =>
                              setUser({ ...user, role: "travel_agent" })
                            }
                            checked={user.role == "travel_agent"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Travel Agent
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault3"
                            disabled={
                              auth.role == "travel_agent" ||
                              auth.role == "traveler"
                            }
                            onChange={(e) =>
                              setUser({ ...user, role: "backoffice" })
                            }
                            checked={user.role == "backoffice"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault3"
                          >
                            Back Office
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={handleCreateModalClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={createUser}
                    >
                      {"Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            {users.length > 0 ? (
              <div style={{ padding: "10px", overflow: "auto" }}>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">NIC/Passport Number</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Active Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="pointer">
                        <th scope="row">{user.nic}</th>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.contactNo}</td>
                        <td>{user.isActive ? "Active" : "Deactive"}</td>
                        <td>
                          {user.nic != "000000000V" &&
                            user.nic != auth.nic &&
                            auth.role == "backoffice" && (
                              <div style={{ display: "flex" }}>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    margin: "5px",
                                    borderRadius: "50px",
                                    justifyContent: "center",
                                    backgroundColor: "rgb(255, 221, 10)",
                                    alignItems: "center",
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Edit user"
                                >
                                  <center>
                                    <img
                                      style={{ margin: "10px" }}
                                      width={10}
                                      src={edit_icon}
                                    />
                                  </center>
                                </div>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    margin: "5px",
                                    borderRadius: "50px",
                                    justifyContent: "center",
                                    backgroundColor: "rgb(255, 0, 1)",
                                    alignItems: "center",
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Delete user"
                                >
                                  <center>
                                    <img
                                      style={{ margin: "10px" }}
                                      width={10}
                                      src={delete_icon}
                                    />
                                  </center>
                                </div>
                              </div>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <center>
                  <Nodata />
                </center>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement;
