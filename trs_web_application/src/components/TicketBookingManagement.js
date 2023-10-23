//components/TicketBookingManagement.js

import React, { useState, useEffect } from "react";
import Nodata from "../utils/Nodata";
import Loading from "../utils/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ticket_icon from "../assets/icons/ticket-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import plus_icon from "../assets/icons/plus-solid.svg";
import delete_icon from "../assets/icons/trash-solid.svg";
import { useSelector } from "react-redux";
import { getAxiosInstance } from "../utils/axios";
import {
  RequestManagementAPI,
  ReservationManagementAPI,
  UserManagementAPI,
} from "../utils/api";
import Select from "react-select";
import Spinner from "../utils/Spinner";

const TicketBookingManagement = () => {
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth.user);
  const [reservations, setReservations] = useState([]);
  const [bookingReqDetails, setBookingReqDetails] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [bookingReqDetail, setBookingReqDetail] = useState({});
  const [fReservations, setFReservations] = useState("");
  const [filterTraveller, setFilterTraveller] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isRLoading, setIsRLoading] = useState("");
  const [callback, setCallback] = useState(true);
  const [callbackR, setCallbackR] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isResEdit, setIsResEdit] = useState(false);
  const [isShowAllBookingRequests, setIsShowAllBookingRequests] =
    useState(true);
  const [reservation, setReservation] = useState({
    createdAt: "",
    bookings: [],
    ownerId: "0",
    totalPrice: 0,
  });

  const [travelers, setTravelers] = useState([]);
  console.log(
    "🚀 ~ file: TicketBookingManagement.js:48 ~ TicketBookingManagement ~ travelers:",
    travelers
  );
  const [travelersOptions, setTravelersOptions] = useState([]);
  const [travelersOptionsSelect, setTravelersOptionsSelect] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isNewReservation, setIsNewReservation] = useState(true);

  const getAllReservationsByCreatedBy = async () => {
    try {
      setIsLoading(true);
      const path = ReservationManagementAPI.getAllReservationsByCreatedBy;
      const res = await getAxiosInstance().get(path, {
        headers: { Authorization: `bearer ${token}` },
      });
      setReservations(res.data);
      console.log(
        "🚀 ~ file: TicketBookingManagement.js:39 ~ getAllReservationsByCreatedBy ~ res.data:",
        res.data
      );
      setFReservations(res.data);
      setBookingReqDetails(res.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: TicketBookingManagement.js:155 ~ getAllBookingDetails ~ error:",
        error
      );

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    callback && getAllReservationsByCreatedBy() && getTravelers();
    setCallback(false);
  }, [callback]);

  useEffect(() => {
    let ReservationList = fReservations;
    if (
      ReservationList.length > 0 &&
      (filterTraveller != null || filterTraveller != "")
    ) {
      ReservationList = ReservationList.filter((reservations) => {
        return reservations.ownerDetails.name
          .toLowerCase()
          .includes(filterTraveller.toLowerCase());
      });
    }
    setReservations(ReservationList);
  }, [filterTraveller]);

  //Requests

  const getAllRequests = async () => {
    try {
      setIsRLoading(true);
      const path = RequestManagementAPI.getAllRequests;
      const res = await getAxiosInstance().get(path, {
        headers: { Authorization: `bearer ${token}` },
      });
      setBookingRequests(res.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: TicketBookingManagement.js:94 ~ getAllRequests ~ error:",
        error
      );
    } finally {
      setIsRLoading(false);
    }
  };

  useEffect(() => {
    callbackR && getAllRequests();
    setCallbackR(false);
  }, [callbackR]);

  const handleRequest = async (data) => {
    setBookingReqDetail(data);
  };

  const handleCreateModalClose = () => {
    setBookingReqDetail("");
  };

  const getTravelers = async () => {
    try {
      const res = await getAxiosInstance().get(UserManagementAPI.getTravelers, {
        headers: { Authorization: `bearer ${token}` },
      });
      if (res.data.length > 0) {
        setTravelers(res.data);
        let travelers = [];
        for (const t of res.data) {
          const traveler = {
            ...t,
            label: t.name + " - " + t.nic,
            value: t.id,
          };
          travelers.push(traveler);
        }
        setTravelersOptions(travelers);
        setTravelersOptionsSelect(travelers);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: TrainManagement.js:291 ~ getAllTrainRoutes ~ error:",
        error
      );
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
  const updateReservation = async () => {
    try {
    } catch (error) {
      console.log(
        "🚀 ~ file: TicketBookingManagement.js:131 ~ updateReservation ~ error:",
        error
      );
    }
  };

  const createReservation = async () => {
    try {
      const res = await getAxiosInstance().post(
        ReservationManagementAPI.create,
        reservation,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      toast.success("Reservation successfully created !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleCreateModalClose2();
      setCallback(true);
    } catch (error) {
      console.log(
        "🚀 ~ file: TicketBookingManagement.js:141 ~ createReservation ~ error:",
        error
      );
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

  const deleteReservation = async () => {
    try {
    } catch (error) {
      console.log(
        "🚀 ~ file: TicketBookingManagement.js:150 ~ deleteReservation ~ error:",
        error
      );
    }
  };
  const handleCreateModalClose2 = () => {
    setReservation({
      createdAt: "",
      bookings: [],
      ownerId: "0",
      totalPrice: 0,
    });
    setTravelers([]);
    setTravelersOptions([]);
    setTravelersOptionsSelect("");
    setIsResEdit(false);
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
      <div style={{ overflow: "-moz-hidden-unscrollable" }}>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <img width={25} src={ticket_icon} />
          <h5 style={{ marginLeft: "10px" }}>Ticket Booking Management</h5>
        </div>
        <div
          className="modal fade"
          id="exampleModalCenter3"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
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
                  {isResEdit ? "Edit Reservation" : "Create New Reservation"}
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
                  onClick={handleCreateModalClose2}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div style={{ color: "black" }} className="modal-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput22c22"
                      className="form-label"
                    >
                      Select Traveler
                    </label>
                    <Select
                      id="Traveler"
                      options={travelersOptions}
                      value={travelersOptionsSelect}
                      onChange={(e) => {
                        setTravelersOptionsSelect(e);
                      }}
                      placeholder="Search for a traveler..."
                      isSearchable={true}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput22c22"
                      className="form-label"
                    >
                      Bookings
                    </label>
                    <Select
                      id="Traveler"
                      options={travelersOptions}
                      value={travelersOptionsSelect}
                      onChange={(e) => {
                        setTravelersOptionsSelect(e);
                      }}
                      placeholder="Search for a traveler..."
                      isSearchable={true}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleCreateModalClose2}
                  disabled={loadingBtn}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  disabled={loadingBtn}
                  //onClick={isResEdit ? updateTrainShedule : createTrainShedule}
                >
                  {loadingBtn && <Spinner />}
                  {isResEdit ? "Update" : "Create"}
                </button>
              </div>
            </div>
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
          <div className="modal-dialog modal-dialog-centered" role="document">
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
                  {isEdit ? "Edit Reservation" : "Create Reservation"}
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
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      margin: "auto",
                    }}
                  >
                    <div
                      onClick={() => {
                        setIsNewReservation(true);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        textAlign: "center",
                        backgroundColor: isNewReservation
                          ? "#6fc1ff"
                          : "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      New
                    </div>
                    <div
                      onClick={() => {
                        setIsNewReservation(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        textAlign: "center",
                        backgroundColor: !isNewReservation
                          ? "#6fc1ff"
                          : "#ffffff",
                        cursor: "pointer",
                      }}
                    >
                      Exists
                    </div>
                  </div>
                  {isNewReservation ? (
                    <>
                      <div style={{ padding: 5, fontWeight: 500 }}>
                        <div>Traveler Details</div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Name : {bookingReqDetail?.createdByDetails?.name}
                        </div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          NIC/Passport No :{" "}
                          {bookingReqDetail?.createdByDetails?.nic}
                        </div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Contact No :{" "}
                          {bookingReqDetail?.createdByDetails?.contactNo}
                        </div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Email : {bookingReqDetail?.createdByDetails?.email}
                        </div>
                      </div>
                      <div style={{ padding: 5, fontWeight: 500 }}>
                        <div>Train Details</div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Train Name :{" "}
                          {bookingReqDetail?.booking?.trainDetails?.name}
                        </div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Registration Number :{" "}
                          {
                            bookingReqDetail?.booking?.trainDetails
                              ?.registraionNo
                          }
                        </div>
                      </div>
                      <div style={{ padding: 5, fontWeight: 500 }}>
                        <div>Booking Details</div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Booking Date:{" "}
                          {new Date(
                            bookingReqDetail?.booking?.bookingDate
                          ).getUTCDate()}
                          {"."}
                          {new Date(
                            bookingReqDetail?.booking?.bookingDate
                          ).getUTCMonth()}
                          {"."}
                          {new Date(
                            bookingReqDetail?.booking?.bookingDate
                          ).getUTCFullYear()}
                          {" - "}
                          {new Date(
                            bookingReqDetail?.booking?.bookingDate
                          ).getUTCHours()}
                          {":"}
                          {new Date(
                            bookingReqDetail?.booking?.bookingDate
                          ).getUTCMinutes()}
                          {":"}
                          {new Date(
                            bookingReqDetail?.booking?.bookingDate
                          ).getUTCMilliseconds()}
                        </div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Pick Station :{" "}
                          {bookingReqDetail?.booking?.pickStation}
                        </div>
                        <div style={{ marginLeft: 10, fontSize: 12 }}>
                          Drop Station :{" "}
                          {bookingReqDetail?.booking?.dropStation}
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
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
                  onClick={isEdit ? updateReservation : createReservation}
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="row">
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
              <div className="col">
                <div>
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
                          Filter By Traveller
                        </label>
                        <input
                          value={filterTraveller}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1500"
                          placeholder="Ex: Sean Udayantha"
                          onChange={(e) => setFilterTraveller(e.target.value)}
                        />
                      </div>{" "}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1500"
                          className="form-label"
                        >
                          Filter By Date From
                        </label>
                        <input
                          value={filterTraveller}
                          type="date"
                          className="form-control"
                          id="exampleFormControlInput1500"
                          onChange={(e) => setFilterDateFrom(e.target.value)}
                        />
                      </div>
                    </div>
                    {auth.role == "travel_agent" && (
                      <div
                        style={{
                          cursor: "pointer",
                          float: "right",
                          borderRadius: "50px",
                          justifyContent: "center",
                          backgroundColor: "rgb(0, 163, 44)",
                          alignItems: "center",
                          marginRight: "20px",
                        }}
                        data-toggle="modal"
                        data-target="#exampleModalCenter3"
                      >
                        <div
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Create train"
                        >
                          <center>
                            <img
                              style={{ margin: "10px" }}
                              width={25}
                              src={plus_icon}
                            />
                          </center>
                        </div>
                      </div>
                    )}
                    {reservations.length > 0 ? (
                      <div style={{ padding: "10px", overflow: "auto" }}>
                        <table className="table table-striped table-hover table align-middle">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col">User Name</th>
                              <th
                                scope="col"
                                style={{
                                  verticalAlign: "middle",
                                }}
                              >
                                <center>Bookings</center>
                              </th>
                              <th scope="col">Total Price</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {reservations.map((u) => (
                              <tr key={u.id} className="pointer">
                                <td class="vertical-align-middle;">
                                  {u.ownerDetails.name}
                                </td>
                                <td>
                                  <table>
                                    <thead>
                                      <th scope="col">From</th>
                                      <th scope="col">To</th>
                                      <th scope="col">Train Name</th>
                                      <th scope="col">Booking Date</th>
                                      <th scope="col">Start Time</th>
                                      <th scope="col">End Time</th>
                                      <th scope="col">Ticket Price</th>
                                      <th scope="col">Ticket Count</th>
                                      <th scope="col"></th>
                                    </thead>
                                    <tbody>
                                      {u.bookings?.map((b) => (
                                        <tr key={b.id} className="pointer">
                                          <td>{b.pickStation}</td>
                                          <td>{b.dropStation}</td>
                                          <td>
                                            {b.bookingDate.substring(0, 10)}
                                          </td>
                                          <td>{b.trainDetails.name}</td>
                                          <td>{b.scheduleDetails.startTime}</td>
                                          <td>{b.scheduleDetails.endTime}</td>
                                          <td>Rs.{b.tickectPrice}</td>
                                          <td>{b.tickectCount}</td>
                                          <td>
                                            {" "}
                                            {auth.role == "travel_agent" && (
                                              <div
                                                style={{
                                                  display: "flex",
                                                  float: "",
                                                }}
                                              >
                                                <div
                                                  onClick={() => {
                                                    setIsEdit(true);
                                                    // setTrain({
                                                    //   ...train,
                                                    //   name: u.name,
                                                    //   registraionNo: u.registraionNo,
                                                    //   imagePath: u.imagePath,
                                                    // });
                                                  }}
                                                  style={{
                                                    cursor: "pointer",
                                                    margin: "5px",
                                                    borderRadius: "50px",
                                                    justifyContent: "center",
                                                    backgroundColor:
                                                      "rgb(212, 194, 2)",
                                                    alignItems: "center",
                                                  }}
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title="Edit Booking"
                                                >
                                                  <div
                                                    data-toggle="modal"
                                                    data-target="#exampleModalCenter"
                                                  >
                                                    <center>
                                                      <img
                                                        style={{
                                                          margin: "10px",
                                                        }}
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
                                                    backgroundColor:
                                                      "rgb(181, 2, 2)",
                                                    alignItems: "center",
                                                  }}
                                                  data-toggle="tooltip"
                                                  data-placement="bottom"
                                                  title="Delete Booking"
                                                  // onClick={() => {
                                                  //   deleteRoute(u.id);
                                                  // }}
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
                                </td>
                                <td>Rs.{u.totalPrice}</td>
                                <td>
                                  {/* {auth.role == "travel_agent" && (
                                    <div
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
                                      title="Delete Booking"
                                      // onClick={() => {
                                      //   deleteRoute(u.id);
                                      // }}
                                    >
                                      <center>
                                        <img
                                          style={{ margin: "10px" }}
                                          width={10}
                                          src={delete_icon}
                                        />
                                      </center>
                                    </div>
                                  )} */}
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
              </div>
            )}

            <div className="col col-lg-3">
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    borderRadius: "20px",
                    backgroundColor: "rgb(0, 0, 0,0.5)",
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      marginTop: "10px",
                      marginBottom: "10px",
                      padding: "10px",
                    }}
                  >
                    {isRLoading ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Loading />
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <center>
                            <h5 style={{ textAlign: "center" }}>
                              Booking Requests
                            </h5>
                          </center>
                        </div>
                        <div>
                          {bookingRequests.length > 0 ? (
                            bookingRequests.map((bookReq) => (
                              <>
                                <div
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  className="container"
                                  style={{
                                    backgroundColor: "rgb(0,0,0,0.9)",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    height: "auto",
                                    width: "98%",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                    transition: "transform 0.2s",
                                  }}
                                  key={bookReq.id}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1.05)"; // Zoom in on hover
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                      "scale(1)"; // Reset to the original size on hover out
                                  }}
                                  onClick={() => {
                                    handleRequest(bookReq);
                                  }}
                                >
                                  <div style={{ display: "flex", gap: 5 }}>
                                    <img
                                      style={{
                                        width: "25px",
                                        height: "25px",
                                        borderRadius: "50px",
                                      }}
                                      src={bookReq.createdByDetails.imagePath}
                                    ></img>
                                    <h5>{bookReq.createdByDetails.name}</h5>
                                  </div>
                                  <div style={{ fontSize: 12 }}>
                                    Booking Date :{" "}
                                    {new Date(
                                      bookReq.booking.bookingDate
                                    ).getUTCDate()}
                                    {"."}
                                    {new Date(
                                      bookReq.booking.bookingDate
                                    ).getUTCMonth()}
                                    {"."}
                                    {new Date(
                                      bookReq.booking.bookingDate
                                    ).getUTCFullYear()}
                                    {" - "}
                                    {new Date(
                                      bookReq.booking.bookingDate
                                    ).getUTCHours()}
                                    {":"}
                                    {new Date(
                                      bookReq.booking.bookingDate
                                    ).getUTCMinutes()}
                                    {":"}
                                    {new Date(
                                      bookReq.booking.bookingDate
                                    ).getUTCMilliseconds()}
                                  </div>
                                  <div style={{ fontSize: 10 }}>
                                    Pick Station: {bookReq.booking.pickStation}
                                  </div>
                                  <div style={{ fontSize: 10 }}>
                                    End Station: {bookReq.booking.dropStation}
                                  </div>
                                  <div style={{ fontSize: 10 }}>
                                    Request Accepted:{" "}
                                    {bookReq.isReqAccepted
                                      ? "Accepted"
                                      : "Not Accepted"}
                                  </div>
                                </div>
                              </>
                            ))
                          ) : (
                            <div>
                              <center>
                                <Nodata />
                              </center>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketBookingManagement;
