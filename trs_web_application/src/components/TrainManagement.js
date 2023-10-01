/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import plus_icon from "../assets/icons/plus-solid.svg";
import logo from "../assets/train.png";
import train_icon from "../assets/icons/train-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import delete_icon from "../assets/icons/trash-solid.svg";
import AddTrain from "./trainManagement/AddTrain";
import UpdateTrain from "./trainManagement/UpdateTrain";
const trainData = [
  {
    id: 1,
    image: "../assets/train.png",
    trainName: "train 1",
    Availability: "unavailable",
    regNo: "TR001",
  },
  {
    id: 2,
    image: "../assets/train.png",
    trainName: "train 2",
    Availability: "available",
    regNo: "TR001",
  },
  {
    id: 3,
    image: "../assets/train.png",
    trainName: "train 3",
    Availability: "available",
    regNo: "TR001",
  },
  {
    id: 4,
    image: "../assets/train.png",
    trainName: "train 4",
    Availability: "available",
    regNo: "TR001",
  },
  {
    id: 5,
    image: "../assets/train.png",
    trainName: "train 5",
    Availability: "available",
    regNo: "TR001",
  },
  {
    id: 6,
    image: "../assets/train.png",
    trainName: "train 6",
    Availability: "available",
    regNo: "TR001",
  },
];
const TrainManagement = () => {
  const[trainStatus,setTrainStatus]=useState(true);
  console.log("🚀 ~ file: TrainManagement.js:54 ~ TrainManagement ~ trainStatus:", trainStatus)
  const handleEdit = (eid) => {};
  const changeStatus = (sid) => {
if (sid===1) {
  setTrainStatus(true)
}else if(sid===0){
  setTrainStatus(false)
} else {
  
}
  };
  return (
    <div style={{ width: "100%" }}>
      <div class="container text-center m-2">
        <div class="row">
          <div class="col-6 col-sm-6 ">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <img width={15} src={train_icon} />
              <h5 style={{ marginLeft: "10px" }}>Train Management</h5>
            </div>
          </div>
          <div class="col-6 col-sm-4 offset-sm-2">
            <div
              style={{
                cursor: "pointer",
                float: "right",
                borderRadius: "50px",
                justifyContent: "center",
                backgroundColor: "#367E18",
                alignItems: "center",
              }}
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <div>
                <center>
                  <img style={{ margin: "10px" }} width={25} src={plus_icon} />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add modal */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              {/* <h1
                class="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "black" }}
              >
                Add Train
              </h1> */}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <AddTrain/>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div> */} 
          </div>
        </div>
      </div>
      {/* train table */}
      <div style={{ width: "100%" }}>
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Image</th>
                <th scope="col">Train Name</th>
                <th scope="col">Registration Number</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {trainData?.map((train) => (
                <tr key={train.id}>
                  <th scope="row">{train.id}</th>
                  <td>
                    <img width={15} src={logo} />
                  </td>
                  <td>{train.trainName}</td>
                  <td>{train.regNo}</td>
                  <td>{train.Availability}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          cursor: "pointer",
                          margin: "5px",
                          borderRadius: "50px",
                          justifyContent: "center",
                          backgroundColor: "#F9D923",
                          alignItems: "center",
                        }}
                        onClick={(e) => handleEdit(train.id)}
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Edit user"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                      >
                        <center>
                          <img
                            style={{ margin: "10px" }}
                            width={10}
                            src={edit_icon}
                          />
                        </center>
                      </div>
                      {train.Availability === "available" ? (
                        <div
                          style={{
                            cursor: "pointer",
                            margin: "5px",
                            borderRadius: "50px",
                            justifyContent: "center",
                            backgroundColor: "#36AE7C",
                            alignItems: "center",
                          }}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Change status"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal3"
                          onClick={(e) => changeStatus(0)}
                        >
                          <center>
                            <img
                              style={{ margin: "10px" }}
                              width={10}
                              src={delete_icon}
                            />
                          </center>
                        </div>
                      ) : train.Availability === "unavailable" ? (
                        <div
                          style={{
                            cursor: "pointer",
                            margin: "5px",
                            borderRadius: "50px",
                            justifyContent: "center",
                            backgroundColor: "#EB5353",
                            alignItems: "center",
                          }}
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Change status"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal3"
                          onClick={(e) => changeStatus(1)}
                        >
                          <center>
                            <img
                              style={{ margin: "10px" }}
                              width={10}
                              src={delete_icon}
                            />
                          </center>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* edit modal */}
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <UpdateTrain/>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
      {/* status modal */}
      <div
        class="modal fade"
        id="exampleModal3"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5"
                id="exampleModalLabel"
                style={{ color: "black" }}
              >
                Change status
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              { !trainStatus && 
              <p style={{color:"#EB5353"}}>
                you want change status on train unavailable
              </p>
              }

              {trainStatus &&
              <p style={{color:"#36AE7C"}}>
                you want change status on train available
              </p>
              }
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button type="button" class="btn btn-primary">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainManagement;
