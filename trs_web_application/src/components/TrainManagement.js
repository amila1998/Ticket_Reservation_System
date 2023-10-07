/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import user_icon from "../assets/icons/user-solid.svg";
import plus_icon from "../assets/icons/plus-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import wrong_icon from "../assets/icons/wrong-svgrepo-com.svg";
import delete_icon from "../assets/icons/trash-solid.svg";
import correct_icon from "../assets/icons/correct-svgrepo-com.svg";
import Nodata from "../utils/Nodata";
import { getAxiosInstance } from "../utils/axios";
import { useSelector } from "react-redux";
import Loading from "../utils/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrainManagement = () => {
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth.user);
  const [trains, setTrains] = useState([]);
  const [ftrains, setFtrains] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [train, setTrain] = useState({
    name: "",
    imagePath:
      "https://res.cloudinary.com/amiladevin1998/image/upload/v1696069476/download_cmzzo6.png",
    registraionNo: "",
  });
  const [callback, setCallback] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [filterRegNo, setFilterRegNo] = useState("");
  const [filterActive, setFilterActive] = useState("");

  const getAllTrains = async () => {};
  const createTrain = async () => {};
  const updateTrain = async () => {};
  const changeActiveStatus = async (regNo) => {};

  const handleCreateModalClose = () => {
    setTrain({
      ...train,
      name: "",
      imagePath:
        "https://res.cloudinary.com/amiladevin1998/image/upload/v1696069476/download_cmzzo6.png",
      registraionNo: "",
    });
    setIsEdit(false);
  };

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
            <h5 style={{ marginLeft: "5px" }}>Train Management</h5>
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
                  htmlFor="exampleFormControlInput1500"
                  className="form-label"
                >
                  Filter By Train Registraion Number
                </label>
                <input
                  value={filterRegNo}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1500"
                  placeholder="Ex: T0002"
                  onChange={(e) => setFilterRegNo(e.target.value)}
                />
              </div>{" "}
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1200"
                  className="form-label"
                >
                  Filter By Active Status
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setFilterActive(e.target.value)}
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
                title="Create trainr"
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
                      {isEdit ? "Edit User" : "Create New User"}
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
                          htmlFor="exampleFormControlInput111"
                          className="form-label"
                        >
                          Train Name
                        </label>
                        <input
                          value={train.name}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput111"
                          placeholder="Udarata Manike"
                          onChange={(e) =>
                            setTrain({ ...train, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput222"
                          className="form-label"
                        >
                          Trainn Registraion Number
                        </label>
                        <input
                          value={train.registraionNo}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput222"
                          placeholder="T0001"
                          onChange={(e) =>
                            setTrain({
                              ...train,
                              registraionNo: e.target.value,
                            })
                          }
                          disabled={isEdit}
                        />
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
                      onClick={isEdit ? updateTrain : createTrain}
                    >
                      {isEdit ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            {trains.length > 0 ? (
              <div style={{ padding: "10px", overflow: "auto" }}>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Registration No</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {trains.map((u) => (
                      <tr key={u.id} className="pointer">
                        <th scope="row">{u.nic}</th>
                        <td>{u.registraionNo}</td>
                        <td>
                          <img src={u.imagePath} width={15} />
                        </td>
                        <td>{u.name}</td>
                        <td>{u.isActive ? "Active" : "Deactive"}</td>
                        <td>
                          {auth.role == "backoffice" && (
                            <div style={{ display: "flex", float: "right" }}>
                              <div
                                onClick={() => {
                                  changeActiveStatus(u.registraionNo);
                                }}
                                style={{
                                  cursor: "pointer",
                                  margin: "5px",
                                  borderRadius: "50px",
                                  justifyContent: "center",
                                  backgroundColor: u.isActive
                                    ? "rgb(209, 99, 8)"
                                    : "rgb(0, 168, 8)",
                                  alignItems: "center",
                                }}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title={
                                  u.isActive
                                    ? "Deactivate train"
                                    : "Activate train"
                                }
                              >
                                <center>
                                  <img
                                    style={{ margin: "10px" }}
                                    width={10}
                                    src={u.isActive ? wrong_icon : correct_icon}
                                  />
                                </center>
                              </div>
                              <div
                                onClick={() => {
                                  setIsEdit(true);
                                  setTrain({
                                    ...train,
                                    name: u.name,
                                    registraionNo: u.registraionNo,
                                    imagePath: u.imagePath,
                                  });
                                }}
                                style={{
                                  cursor: "pointer",
                                  margin: "5px",
                                  borderRadius: "50px",
                                  justifyContent: "center",
                                  backgroundColor: "rgb(212, 194, 2)",
                                  alignItems: "center",
                                }}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="Edit user"
                              >
                                <div
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                >
                                  <center>
                                    <img
                                      style={{ margin: "10px" }}
                                      width={10}
                                      src={edit_icon}
                                    />
                                  </center>
                                </div>
                              </div>
                              {/* <div
                                  style={{
                                    cursor: "pointer",
                                    margin: "5px",
                                    borderRadius: "50px",
                                    justifyContent: "center",
                                    backgroundColor: "rgb(181, 2, 2)",
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
                                </div> */}
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

export default TrainManagement;
