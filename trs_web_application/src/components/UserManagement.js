import React, { useEffect, useState } from "react";
import user_icon from "../assets/icons/user-solid.svg";
import plus_icon from "../assets/icons/plus-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import delete_icon from "../assets/icons/trash-solid.svg";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [callback, setCallback] = useState(true);

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
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
        data-toggle="tooltip"
        data-placement="bottom"
        title="Create a user"
      >
        <center>
          <img style={{ margin: "10px" }} width={25} src={plus_icon} />
        </center>
      </div>
      <br />
      <br />
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
            <tr className="pointer">
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>
                <div style={{ display: "flex", }}>
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
