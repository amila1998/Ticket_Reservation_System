/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import logo from "../../assets/train.png";
const AddTrain = () => {
  return (
    <>
      <div class="container mt-3">
        <h2 style={{ color: "black" }}>Train Information Form</h2>
        <form>
          <div class="form-group mb-4">
            <label
              style={{
                backgroundColor: "#FFF",
                borderRadius: "5px",
                border: "1px solid rgba(36,36,36,0.12)",
                boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
                width: "100px",
                height: "100px",
              }}
            >
            <center>
                <img style={{ margin: "10px" }} width={80} src={logo} />
            </center>
              <input
                type="file"
                style={{ display: "none" }}
                id="trainImage"
                name="trainImage"
              />
              
            </label>
          </div>
          <div class="form-group mb-2">
            <label for="trainName" style={{ color: "black" }}>
              Train Name
            </label>
            <input
              type="text"
              class="form-control"
              id="trainName"
              name="trainName"
              required
            />
          </div>
          <div class="form-group mb-2">
            <label for="registerNumber" style={{ color: "black" }}>
              Register Number
            </label>
            <input
              type="text"
              class="form-control"
              id="registerNumber"
              name="registerNumber"
              required
            />
          </div>
          <div class="form-group mb-3">
            <label for="status" style={{ color: "black" }}>
              Status
            </label>
            <select class="form-control" id="status" name="status">
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">
            Add Train
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTrain;
