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
  const [callback, setCallback] = useState(true);
   const token = useSelector((state) => state.auth.token);
   const auth = useSelector((state) => state.auth.user);

   const [user, setUser] = useState({
     name: "",
     password: "000000",
     role: "",
     nic: "",
     imagePath: "",
     contactNo: "",
   });


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
        <div style={{ height: "fit-content" }}>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <img width={15} src={user_icon} />
            <h5 style={{ marginLeft: "5px" }}>User Management</h5>
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
                      Create New User
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
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div style={{ color: "black" }} class="modal-body"></div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Create
                    </button>
                  </div>
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
                        {user.nic != "000000000V" && (
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
      )}
    </>
  );
};

export default UserManagement;
