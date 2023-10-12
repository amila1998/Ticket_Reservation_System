import React, { useState, useEffect } from "react";
import Nodata from "../utils/Nodata";
import Loading from "../utils/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ticket_icon from "../assets/icons/ticket-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import delete_icon from "../assets/icons/trash-solid.svg";
import go_back_icon from "../assets/icons/arrow-left-long.svg";
import { useSelector } from "react-redux";
import { getAxiosInstance } from "../utils/axios";
import { ReservationManagementAPI } from "../utils/api";


const TicketBookingManagement = () => {
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth.user);
  const [reservations, setReservations] = useState([]);
  const [bookingReqDetails, setBookingReqDetails] = useState([]);
  const [fReservations, setFReservations] = useState("");
  const [filterTraveller, setFilterTraveller] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [callback, setCallback] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowAllBookingRequests, setIsShowAllBookingRequests] =
    useState(true);

  const getAllReservationsByCreatedBy = async () => {
    try {
      setIsLoading(true);
      const path = ReservationManagementAPI.getAllReservationsByCreatedBy;
      const res = await getAxiosInstance().get(
        path + "?ownerId=" + "6517cb823f5bb25d602e4cd8",
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
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
    callback && getAllReservationsByCreatedBy();
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
                    {reservations.length > 0 ? (
                      <div style={{ padding: "10px", overflow: "auto" }}>
                        <table className="table table-striped table-hover table align-middle">
                          <thead className="thead-dark">
                            <tr>
                              <th scope="col" >User Name</th>
                              <th scope="col" style={{
                                                  verticalAlign: "middle",
                                                  
                                                }}>
                                <center>Bookings</center>
                              </th>
                              <th scope="col">Total Price</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {reservations.map((u) => (
                              <tr key={u.id} className="pointer">
                                <td class="vertical-align-middle;">{u.ownerDetails.name}</td>
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
                                            {auth.role == "backoffice" && (
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
                                                <div
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
                                                </div>
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
                                  {auth.role == "backoffice" && (
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
                  {isShowAllBookingRequests ? (
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h5
                          style={{ marginLeft: "10px", marginBottom: "10px" }}
                        >
                          Booking Requests
                        </h5>
                      </div>
                      <div>
                        {bookingReqDetails.map((bookingDetails, index) => (
                          <>
                            <div
                              className="container"
                              style={{
                                backgroundColor: "rgb(0,0,0,0.7)",
                                padding: "10px",
                                borderRadius: "10px",
                                height: "auto",
                                width: "98%",
                                marginBottom: "10px",
                              }}
                              key={index}
                            >
                              <div
                                class="row gy-3"
                                onClick={() => {
                                  setIsShowAllBookingRequests(false);
                                  setBookingReqDetails({
                                    ...bookingReqDetails,
                                    bookings : bookingDetails.bookings
                                    // id: bookingDetails.id,
                                    // pickStation:
                                    //   bookingDetails.bookings[0].pickStation,
                                    // dropStation:
                                    //   bookingDetails.bookings[0].dropStation,
                                    // startTime:
                                    //   bookingDetails.bookings[0].scheduleDetails
                                    //     .startTime,
                                    // endTime:
                                    //   bookingDetails.bookings[0].scheduleDetails
                                    //     .endTime,
                                  });
                                }}
                                style={{
                                  padding: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                <div >
                                  <div class="row" >
                                    <div class="col-3" >
                                      <img
                                        src={
                                          bookingDetails.ownerDetails?.imagePath
                                        }
                                        width={60}
                                        className="profile_image"
                                      ></img>
                                    </div>
                                    <div class="col-9">
                                      <div style={{ textWrap: "wrap" }}>
                                        <h5>
                                          {bookingDetails.ownerDetails?.name}
                                        </h5>
                                        <h7>
                                          This User have{" "}
                                          {bookingDetails.bookings.length}{" "}
                                          bookings
                                        </h7>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                    alignContent: "center",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <div class="avatar2">
                                    <img
                                      width={10}
                                      src={
                                        bookingDetails.ownerDetails?.imagePath
                                      }
                                      alt="User Image"
                                    />
                                  </div>
                                  <div style={{ textWrap: "wrap" }}>
                                    <h5>{bookingDetails.ownerDetails?.name}</h5>
                                    <h7>
                                      This User have{" "}
                                      {bookingDetails.bookings.length} bookings
                                    </h7>
                                  </div>
                                </div> */}
                                {/*
                                <div class="col-12	col-sm-12	col-md-3	col-lg-3	col-xl-3">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "18px",
                                    }}
                                  >
                                    <h6>End station</h6>
                                    <h6>
                                      {bookingDetails.bookings[0].dropStation}
                                    </h6>
                                  </div>
                                </div>
                                 <div class="col-12	col-sm-12	col-md-3	col-lg-3	col-xl-3">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "18px",
                                    }}
                                  >
                                    <h6>Start Time</h6>
                                    <h6>
                                      {
                                        bookingDetails.bookings[0]
                                          .scheduleDetails.startTime
                                      }
                                    </h6>
                                  </div>
                                </div>
                                <div class="col-12	col-sm-12	col-md-4	col-lg-4	col-xl-4"></div>
                                <div class="col-12	col-sm-12	col-md-4	col-lg-4	col-xl-4">
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "18px",
                                    }}
                                  >
                                    <h6>End Time</h6>
                                    <h6>
                                      {
                                        bookingDetails.bookings[0]
                                          .scheduleDetails.endTime
                                      }
                                    </h6>
                                  </div>
                                </div> */}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="container">
                      <div className="row">
                        <div
                          style={{
                            display: "flex",
                            float: "",
                          }}
                        >
                          <div
                            onClick={() => {
                              setIsShowAllBookingRequests(true);
                              setBookingReqDetails({
                                ...bookingReqDetails,
                                bookings : bookingReqDetails.bookings

                              })
                            }}
                            style={{
                              cursor: "pointer",
                              margin: "5px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Go Back"
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
                                  width={25}
                                  src={go_back_icon}
                                />
                              </center>
                            </div>
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "baseline" }}
                          >
                            <h5
                              style={{
                                alignContent: "center",
                                marginTop: "15px",
                              }}
                            >
                              Booking Details
                            </h5>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            marginTop: "0px",
                            marginBottom: "0px",
                            padding: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          <div></div>
                          <div
                            className="container"
                            style={{
                              backgroundColor: "rgb(0,0,0,0.7)",
                              padding: "10px",
                              borderRadius: "10px",
                              height: "auto",
                              width: "98%",
                              marginBottom: "10px",
                            }}
                          >
                            <div
                              class="row gy-3"
                              onClick={() => {
                                setIsShowAllBookingRequests(false);
                                setBookingReqDetails({
                                  ...bookingReqDetails,
                                  bookings : bookingReqDetails.bookings
  
                                })
                              }}
                              style={{
                                padding: "5px",
                                cursor: "pointer",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "18px",
                                    padding: "5px",
                                  }}
                                >
                                  <h6>Start Station</h6>
                                  <h6>{bookingReqDetails.pickStation}</h6>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "32px",
                                    padding: "5px",
                                  }}
                                >
                                  <h6>End Station</h6>
                                  <h6>{bookingReqDetails.dropStation}</h6>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "30px",
                                    padding: "5px",
                                  }}
                                >
                                  <h6>Start Time</h6>
                                  <h6>{bookingReqDetails.startTime}</h6>
                                </div>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "38px",
                                    padding: "5px",
                                  }}
                                >
                                  <h6>End Time</h6>
                                  <h6>{bookingReqDetails.endTime}</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
