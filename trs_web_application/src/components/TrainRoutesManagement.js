/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import user_icon from "../assets/icons/user-solid.svg";
import plus_icon from "../assets/icons/plus-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import wrong_icon from "../assets/icons/wrong-svgrepo-com.svg";
import delete_icon from "../assets/icons/trash-solid.svg";
import track_icon from "../assets/icons/track.svg";
import correct_icon from "../assets/icons/correct-svgrepo-com.svg";
import Nodata from "../utils/Nodata";
import { getAxiosInstance } from "../utils/axios";
import { useSelector } from "react-redux";
import Loading from "../utils/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TrainRoutesManagementAPI } from "../utils/api";
import { SriLankaStations } from "../utils/sriLankaRailStations";
import Select from "react-select";
import Spinner from "../utils/Spinner";

const TrainRouteRoutesManagement = () => {
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth.user);
  const [trainRoutes, setTrainRoutes] = useState([]);
  const [ftrainRoutes, setFtrainRoutes] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [sStartStation, setSStartStation] = useState("");
  const [sEndStation, setSEndStation] = useState("");
  const [fStations, setfStations] = useState([]);
  const [stopStationOrder,setStopStationOrder]=useState(0)

  const [trainRoute, setTrainRoute] = useState({
    id: "",
    routeName: "",
    startStation: "",
    endStation: "",
    stations: [],
  });
  console.log("🚀 ~ file: TrainRoutesManagement.js:39 ~ TrainRouteRoutesManagement ~ trainRoute:", trainRoute)


  useEffect(() => {
    sStartStation && sStartStation.value &&
      setTrainRoute({ ...trainRoute, startStation: sStartStation.value });
  }, [sStartStation]);
  useEffect(() => {
    sEndStation &&
      sEndStation.value &&
      setTrainRoute({ ...trainRoute, endStation: sEndStation.value });
  }, [sEndStation]);
  useEffect(() => {
    if (fStations && fStations.length > 0) {
      let st = [];
        for (let index = 0; index < fStations.length; index++) {
            const order = index + 1;    
            st.push({ name: fStations[index].value, order: order });
        }
       setTrainRoute({ ...trainRoute, stations: st });
    }
  }, [fStations]);
  
  const [callback, setCallback] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [filterRegNo, setFilterRegNo] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [loadingBtn,setLoadingBtn]=useState(false)

  const getAllTrainRoutes = async () => {
    try {
      setIsLoading(true);
      const res = await getAxiosInstance().get(
        TrainRoutesManagementAPI.getAll,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setTrainRoutes(res.data);
      setFtrainRoutes(res.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: TrainRoutesManagement.js:39 ~ getAllTrainRoutes ~ error:",
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
    callback && getAllTrainRoutes();
    setCallback(false);
  }, [callback]);

  const updateTrainRoute = async () => {
     try {
       setLoadingBtn(true);
       if (!trainRoute.startStation) {
         toast.error("Start station requried", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         return;
       } else if (!trainRoute.endStation) {
         toast.error("End station requried", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         return;
       } else if (trainRoute.stations > 1) {
         toast.error("Stop stations must be greater than 1", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         return;
       } else {
         const res = await getAxiosInstance().put(
           TrainRoutesManagementAPI.update + "/" + trainRoute.id,
           trainRoute,
           {
             headers: { Authorization: `bearer ${token}` },
           }
         );
         toast.success("Route update successfully", {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
         handleCreateModalClose();
         setCallback(true);
       }
     } catch (error) {
       console.log(
         "🚀 ~ file: TrainRoutesManagement.js:108 ~ createTrainRoute ~ error:",
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
       setLoadingBtn(false);
     }
  };
  const changeActiveStatus = async (data) => {
    try {
        const path = data.isDisable ? TrainRoutesManagementAPI.enable : TrainRoutesManagementAPI.disable 
           const res = await getAxiosInstance().put(
             path+"/"+data.id,
             null,
             {
               headers: { Authorization: `bearer ${token}` },
             }
           );
            toast.success("Opereation successfully completed", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setCallback(true);
        
    } catch (error) {
        console.log("🚀 ~ file: TrainRoutesManagement.js:106 ~ changeActiveStatus ~ error:", error)
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
  const deleteRoute = async (id) => {
    try {
        const path = TrainRoutesManagementAPI.delete
           const res = await getAxiosInstance().put(
             path+"/"+id,
             null,
             {
               headers: { Authorization: `bearer ${token}` },
             }
           );
            toast.success("Delete successfully completed", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setCallback(true);
        
    } catch (error) {
        console.log("🚀 ~ file: TrainRoutesManagement.js:106 ~ changeActiveStatus ~ error:", error)
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

  const handleCreateModalClose = () => {
    setTrainRoute({
      ...trainRoute,
      id: "",
      routeName: "",
      startStation: "",
      endStation: "",
      stations: [],
    });
    setfStations([])
    setSEndStation("")
    setSStartStation("")
    setIsEdit(false);
    setStopStationOrder(0)
  };

  const createTrainRoute = async(e)=>{
    try {
        setLoadingBtn(true)
        if (!trainRoute.startStation) {
          toast.error("Start station requried", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return
        } else if (!trainRoute.endStation) {
          toast.error("End station requried", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        } else if (trainRoute.stations > 1) {
          toast.error("Stop stations must be greater than 1", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        } else {
          const res = await getAxiosInstance().post(
            TrainRoutesManagementAPI.create,
            trainRoute,
            {
              headers: { Authorization: `bearer ${token}` },
            }
          );
           toast.success("Route created successfully", {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
           });
           handleCreateModalClose();
           setCallback(true)
        }
    } catch (error) {
        console.log("🚀 ~ file: TrainRoutesManagement.js:108 ~ createTrainRoute ~ error:", error)
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
    } finally{
        setLoadingBtn(false);
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
            <img width={15} src={track_icon} />
            <h5 style={{ marginLeft: "5px" }}>Train Routes Management</h5>
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
              {/* <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1500"
                  className="form-label"
                >
                  Filter By TrainRoute Registraion Number
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
              </div> */}
            </div>
            {auth.role == "backoffice" && (
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
                data-target="#exampleModalCenter"
              >
                <div
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Create train route"
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
                      {isEdit ? "Edit Route" : "Create New Route"}
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
                          htmlFor="exampleFormControlInput1111"
                          className="form-label"
                        >
                          Train Route Name
                        </label>
                        <input
                          value={trainRoute.routeName}
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1111"
                          placeholder="Colombo fort - Badulla"
                          onChange={(e) =>
                            setTrainRoute({
                              ...trainRoute,
                              routeName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train Start Station
                        </label>
                        <Select
                          id="StartStationSelect"
                          options={SriLankaStations}
                          value={sStartStation}
                          onChange={(e) => {
                            setSStartStation(e);
                          }}
                          placeholder="Search for a station..."
                          isSearchable={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train End Station
                        </label>
                        <Select
                          id="EndStationSelect"
                          options={SriLankaStations}
                          value={sEndStation}
                          onChange={(e) => {
                            setSEndStation(e);
                          }}
                          placeholder="Search for a station..."
                          isSearchable={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train Stops
                        </label>
                        <Select
                          isMulti
                          id="EndStationSelect"
                          options={SriLankaStations}
                          value={fStations}
                          onChange={(e) => {
                            setfStations(e);
                          }}
                          placeholder="Search for a station..."
                          isSearchable={true}
                        />
                        <small id="emailHelp" class="form-text text-muted">
                          The list must be in correct order ***
                        </small>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={handleCreateModalClose}
                      disabled={loadingBtn}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      disabled={loadingBtn}
                      onClick={isEdit ? updateTrainRoute : createTrainRoute}
                    >
                      {loadingBtn && <Spinner />}
                      {isEdit ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            {trainRoutes.length > 0 ? (
              <div style={{ padding: "10px", overflow: "auto" }}>
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Route Name</th>
                      <th scope="col">Start Station</th>
                      <th scope="col">End Station</th>
                      <th scope="col">Stops</th>
                      {/* <th scope="col">Active Status</th> */}
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainRoutes.map((u) => (
                      <tr key={u.id} className="pointer">
                        <td>{u.routeName}</td>
                        <td>{u.startStation}</td>
                        <td>{u.endStation}</td>
                        <td>
                          {u.stations.map((s) => (
                            <div
                              style={{
                                padding: "2px",
                                backgroundColor: "rgb(252, 184, 184)",
                                margin: "2px",
                              }}
                              key={s.order}
                            >
                              {s.order+". "+s.name}
                            </div>
                          ))}
                        </td>
                        {/* <td>
                          {" "}
                          <div
                            onClick={() => {
                              auth.role == "backoffice" &&
                                changeActiveStatus(u);
                            }}
                            style={{
                              cursor: "pointer",
                              margin: "5px",
                              width: "25%",
                              borderRadius: "50px",
                              justifyContent: "center",
                              backgroundColor: u.isDisable
                                ? "rgb(209, 99, 8)"
                                : "rgb(0, 168, 8)",
                              alignItems: "center",
                            }}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title={
                              u.isActive
                                ? "Deactivate trainRoute"
                                : "Activate trainRoute"
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
                        </td> */}
                        <td>
                          {auth.role == "backoffice" && (
                            <div style={{ display: "flex", float: "right" }}>
                              {/* <div
                                onClick={() => {
                                  setIsEdit(true);
                                  setTrainRoute({
                                    ...trainRoute,
                                    id: u.id,
                                    routeName: u.routeName,
                                    startStation: u.startStation,
                                    endStation: u.endStation,
                                    stations: u.stations,
                                  });
                                  setSStartStation({
                                    value: u.startStation,
                                    label: u.startStation,
                                  });
                                  setSEndStation({
                                    value: u.endStation,
                                    label: u.endStation,
                                  });
                                  let st = [];
                                  for (const s of u.stations) {
                                    st.push({
                                      value: s,
                                      label: s,
                                    });
                                  }
                                  setfStations(st);
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
                              </div> */}
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
                                title="Delete user"
                                onClick={() => {
                                  deleteRoute(u.id);
                                }}
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

export default TrainRouteRoutesManagement;
