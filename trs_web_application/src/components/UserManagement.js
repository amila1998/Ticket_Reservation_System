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

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [callback, setCallback] = useState(true);
   const token = useSelector((state) => state.auth.token);
   const auth = useSelector((state) => state.auth.user);

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
    } catch (error) {
      setIsLoading(false);
      console.log(
        "🚀 ~ file: UserManagement.js:13 ~ getAllUsers ~ error:",
        error
      );
    }
  };

  useEffect(() => {
    callback && getAllUsers();
  }, [callback]);

  return (
    <>
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
              backgroundColor: "rgb(35, 115, 252,0.2)",
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
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Full Name
                </label>
                <input
                  value={user.name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Sean Udayantha"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>{" "}
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Full Name
                </label>
                <input
                  value={user.name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Sean Udayantha"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>{" "}
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Full Name
                </label>
                <input
                  value={user.name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Sean Udayantha"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
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
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#ffff",
                    border: "none",
                    color: "#0000 !important",
                  }}
                  class="modal-content"
                >
                  <div class="modal-header">
                    <h5
                      style={{ color: "black" }}
                      class="modal-title"
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
                  <div style={{ color: "black" }} class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Full Name
                        </label>
                        <input
                          value={user.name}
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Sean Udayantha"
                          onChange={(e) =>
                            setUser({ ...user, name: e.target.value })
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput2"
                          class="form-label"
                        >
                          NIC/Passport Number
                        </label>
                        <input
                          value={user.nic}
                          type="text"
                          class="form-control"
                          id="exampleFormControlInput2"
                          placeholder="787141785V"
                          onChange={(e) =>
                            setUser({ ...user, nic: e.target.value })
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput3"
                          class="form-label"
                        >
                          Password
                        </label>
                        <input
                          value={user.password}
                          type="password"
                          class="form-control"
                          id="exampleFormControlInput3"
                          placeholder="787141785V"
                          disabled
                          onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput4"
                          class="form-label"
                        >
                          Email
                        </label>
                        <input
                          value={user.email}
                          type="email"
                          class="form-control"
                          id="exampleFormControlInput4"
                          placeholder="example@gmail.com"
                          onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput5"
                          class="form-label"
                        >
                          Contact Number
                        </label>
                        <input
                          value={user.contactNo}
                          type="password"
                          class="form-control"
                          id="exampleFormControlInput5"
                          placeholder="0771234567"
                          onChange={(e) =>
                            setUser({ ...user, contactNo: e.target.value })
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput6"
                          class="form-label"
                        >
                          Role
                        </label>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            checked={user.role == "traveler"}
                            onChange={(e) =>
                              setUser({ ...user, role: "traveler" })
                            }
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Traveler
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
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
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Travel Agent
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
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
                            class="form-check-label"
                            for="flexRadioDefault3"
                          >
                            Back Office
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={handleCreateModalClose}
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
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
