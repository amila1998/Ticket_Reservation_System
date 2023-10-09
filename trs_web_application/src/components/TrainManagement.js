/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import user_icon from "../assets/icons/user-solid.svg";
import plus_icon from "../assets/icons/plus-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import wrong_icon from "../assets/icons/wrong-svgrepo-com.svg";
import photo_icon from "../assets/icons/camera-retro-solid.svg";
import correct_icon from "../assets/icons/correct-svgrepo-com.svg";
import list_icon from "../assets/icons/list-check-solid.svg";
import Nodata from "../utils/Nodata";
import { getAxiosInstance } from "../utils/axios";
import { useSelector } from "react-redux";
import Loading from "../utils/loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ImageAPI,
  TrainRoutesManagementAPI,
  TrainScheduleManagementAPI,
  TrainsManagementAPI,
} from "../utils/api";
import train_icon from "../assets/icons/train-solid.svg";
import Spinner from "../utils/Spinner";
import {
  ClassTypes,
  DayType,
  TrainSpeed,
} from "../utils/TrainSheduleConfigData";
import Select from "react-select";
import ReactDatePicker from "react-datepicker";

const TrainManagement = () => {
  const inputFile = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((state) => state.auth.user);
  const [trains, setTrains] = useState([]);
  const [ftrains, setFtrains] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [train, setTrain] = useState({
    name: "",
    imagePath:
      "https://res.cloudinary.com/amiladevin1998/image/upload/v1696069476/download_cmzzo6.png",
    registraionNo: "",
  });
  console.log("🚀 ~ file: TrainManagement.js:46 ~ TrainManagement ~ train:", train)
  const [callback, setCallback] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isSEdit, setIsSEdit] = useState(false);
  const [filterRegNo, setFilterRegNo] = useState("");
  const [filterActive, setFilterActive] = useState("");

  const getAllTrains = async () => {
    try {
      setIsLoading(true);
      const res = await getAxiosInstance().get(TrainsManagementAPI.getAll, {
        headers: { Authorization: `bearer ${token}` },
      });
      setTrains(res.data);
      setFtrains(res.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: TrainManagement.js:45 ~ getAllTrains ~ error:",
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
    callback && getAllTrains();
    setCallback(false);
  }, [callback]);

  useEffect(() => {
    let trainList = ftrains;
    if (trainList.length > 0 && (filterRegNo != null || filterRegNo != "")) {
      trainList = trainList.filter((train) => {
        return train.registraionNo.toLowerCase().includes(filterRegNo.toLowerCase());
      });
    }
    if (trainList.length > 0 && filterActive) {
      trainList = trainList.filter((train) => {
        return filterActive === "true" ? train.isActive : !train.isActive;
      });
    }

    // if (trainList.length > 0 && filterNIC) {
    //   trainList = trainList.filter((train) => {
    //     return train.nic.toLowerCase().includes(filterNIC.toLowerCase());
    //   });
    // }
    setTrains(trainList);
  }, [filterActive , filterRegNo]);


  const createTrain = async () => {
    try {
      setLoadingBtn(true);
      if (!train.registraionNo) {
        toast.error("Train registration number requried", {
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
      } else if (!train.name) {
        toast.error("Train name requried", {
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
          TrainsManagementAPI.create,
          train,
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        toast.success("Train created successfully", {
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
        "🚀 ~ file: TrainManagement.js:132 ~ createTrain ~ error:",
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

  const updateTrain = async () => {
       try {
         setLoadingBtn(true);
         if (!train.registraionNo) {
           toast.error("Train registration number requried", {
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
         } else if (!train.name) {
           toast.error("Train name requried", {
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
             TrainsManagementAPI.update,
             train,
             {
               headers: { Authorization: `bearer ${token}` },
             }
           );
           toast.success("Train updated successfully", {
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
       console.log("🚀 ~ file: TrainManagement.js:204 ~ updateTrain ~ error:", error)
     
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
      const res = await getAxiosInstance().put(
        TrainsManagementAPI.activeAndDeactive + "/" + data.registraionNo,null,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      toast.success("Train created successfully", {
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
      console.log(
        "🚀 ~ file: TrainManagement.js:144 ~ changeActiveStatus ~ error:",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          let formData = new FormData();
          formData.append("files", file);

          // upload to cloudinary
          const res = await getAxiosInstance().post(ImageAPI.uplaod, formData, {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: `bearer ${token}`,
            },
            onUploadProgress: (x) => {
              if (x.total < 1024000)
                return toast("Uploading", {
                  className: "bg-upload",
                  bodyClassName: "bg-upload",
                  autoClose: 7000,
                });
            },
          });
          setTrain({
            ...train,
            imagePath: res.data,
          });
        } catch (err) {
          toast(err.response.data.msg, {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInput = () => {
    inputFile.current.click();
  };

  //Schedule Management
  const [tManage, setTManage] = useState(true);
  const [schedules, setShedules] = useState([]);
  const [trainRoutes, setTrainRoutes] = useState([]);
  const [trainRoutesOptions, setTrainRoutesOptions] = useState([]);
  const [trainRoutesOptionsSelect, setTrainRoutesOptionsSelect] = useState("");
  const [trainStopsOptions, setTrainStopsOptions] = useState([]);
  console.log("🚀 ~ file: TrainManagement.js:255 ~ TrainManagement ~ trainStopsOptions:", trainStopsOptions)
  const [trainStopsOptionsSelect, setTrainStopsOptionsSelect] = useState([]);
  const [cancelDates, setCancelDates] = useState([]);
  const [dateCancelId, setDateCancelId] = useState(0);

  const [sCallback, setSCallback] = useState(false);
  const [schedule, setSchedule] = useState({
    id: "0",
    dayType: 0,
    trainRegistraionNo: train.registraionNo,
    isCancel: true,
    trainStops: [],
    startTime: "",
    endTime: "",
    trainClasses: [],
    cancelDates: [],
    trainRouteId: "",
    speed: "",
  });
  console.log(
    "🚀 ~ file: TrainManagement.js:258 ~ TrainManagement ~ schedule:",
    schedule
  );

  const getShedules = async () => {
    setIsLoading(true)
    try {
      const res = await getAxiosInstance().get(
        TrainScheduleManagementAPI.getSchedules + "/" + train.registraionNo,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      setShedules(res.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: TrainManagement.js:45 ~ getAllTrains ~ error:",
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
    }finally{
      setIsLoading(false)
    }
  };

  const getAllTrainRoutes = async () => {
    try {
      const res = await getAxiosInstance().get(
        TrainRoutesManagementAPI.getAllActiveRoutes,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      if (res.data.length > 0) {
        setTrainRoutes(res.data);
        let routes = [];
        for (const r of res.data) {
          const route = {
            ...r,
            label:
              r.routeName +
              " - (From:" +
              r.startStation +
              " To:" +
              r.endStation,
            value: r.id,
          };
          routes.push(route);
        }
        setTrainRoutesOptions(routes);
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

  useEffect(() => {
    sCallback && getShedules();
    setSCallback(false);
  }, [sCallback]);

  const [sDayType, setSDayType] = useState({ label: "All", value: 0 });
  const [sTrainClasses, setSTrainClasses] = useState([]);
  const [sTrainSpeed, setSTrainSpeed] = useState("");

  const createTrainShedule = async () => {
    try {
      const res = await getAxiosInstance().post(
        TrainScheduleManagementAPI.create,
        schedule,
        {
          headers: { Authorization: `bearer ${token}` },
        }
      );
      toast.success("Schedule successfully created !", {
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
      setSCallback(true);
    } catch (error) {
      console.log(
        "🚀 ~ file: TrainManagement.js:357 ~ createTrainShedule ~ error:",
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
  const updateTrainShedule = async () => {};
  const handleCreateModalClose2 = () => {
    setSchedule({
      id: "0",
      dayType: 0,
      trainRegistraionNo: train.registraionNo,
      isCancel: false,
      trainStops: [],
      startTime: "",
      endTime: "",
      trainClasses: [],
      cancelDates: [],
      trainRouteId: "",
      speed: "",
    });
    setTrainRoutes([]);
    setTrainRoutesOptions([]);
    setTrainRoutesOptionsSelect("");
    setTrainStopsOptionsSelect([]);
    setTrainStopsOptions([]);
    setCancelDates([]);
    setSTrainSpeed("");
  };

  function calculateTravelTime(startTime, stationCount, speed) {
    // Assuming the distance between two stations is 2 kilometers
    const distanceBetweenStations = 2; // in kilometers

    // Convert the speed from kilometers per hour to kilometers per minute
    const speedPerMinute = speed / 60; // 60 minutes in an hour

    // Calculate the total travel time in minutes
    const totalTravelTime =
      (stationCount * distanceBetweenStations) / speedPerMinute;

    // Parse the start time as HH:mm format
    const [hours, minutes] = startTime.split(":");
    const startHour = parseInt(hours, 10);
    const startMinute = parseInt(minutes, 10);

    // Calculate the end time by adding the travel time to the start time
    const endMinute = startMinute + totalTravelTime;
    let endHour = startHour;

    // Adjust the end hour and minutes if they exceed 60
    while (endMinute >= 60) {
      endHour++;
      endMinute -= 60;
    }

    // Format the end time as HH:mm
    const formattedEndHour = endHour.toString().padStart(2, "0");
    const formattedEndMinute = endMinute.toString().padStart(2, "0");
    const endTime = `${formattedEndHour}:${formattedEndMinute}`;

    console.log("🚀 ~ file: TrainManagement.js:452 ~ calculateTravelTime ~ endTime:", endTime)
    return endTime;
  }

  useEffect(() => {
    sDayType && setSchedule({ ...schedule, dayType: sDayType.value });
  }, [sDayType]);

  useEffect(() => {
    if (sTrainClasses && sTrainClasses.length > 0) {
      let classes = [];
      for (const c of sTrainClasses) {
        classes.push(c.value);
      }
      setSchedule({ ...schedule, trainClasses: classes });
    }
  }, [sTrainClasses]);

  useEffect(() => {
    if (trainStopsOptionsSelect && trainStopsOptionsSelect.length > 0) {
      let stops = [];
      for (const s of trainStopsOptionsSelect) {
        let navTime = "";
        if (schedule.speed === 0) {
          const startTime = schedule.startTime;
          const stationCount = s.order;
          const speed = 60; // kilometers per hour
          navTime = calculateTravelTime(startTime, stationCount, speed);
        } else {
          const startTime = schedule.startTime;
          const stationCount = s.order;
          const speed = 40; // kilometers per hour
          navTime = calculateTravelTime(startTime, stationCount, speed);
        }
        stops.push({
          trainStop: { name: s.value, order: s.order },
          navTime: navTime,
        });
      }
      setSchedule({ ...schedule, trainStops: stops });
    }
  }, [trainStopsOptionsSelect]);

  useEffect(() => {
    if (trainRoutesOptionsSelect) {
      setSchedule({
        ...schedule,
        trainRouteId: trainRoutesOptionsSelect.id,
      });
      let stations = [];
      for (const o of trainRoutesOptionsSelect.stations) {
        const data = {
          ...o,
          label: o.order+". "+o.name,
          value: o.name,
        };
        stations.push(data);
      }
      setTrainStopsOptions(stations);
    }
  }, [trainRoutesOptionsSelect]);

  useEffect(() => {
    if (cancelDates.length > 0) {
      let dates = [];
      for (const d of cancelDates) {
        dates.push(d.value);
      }
      setSchedule({ ...schedule, cancelDates: dates });
    }
  }, [cancelDates]);

  useEffect(() => {
    if (sTrainSpeed) {
      setSchedule({ ...schedule, speed: sTrainSpeed.value });
    }
  }, [sTrainSpeed]);

  // Function to validate and format the input to 24-hour time format
  function formatTo24Hour(inputTime) {
    // Regular expression to match valid time in HH:mm format
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    // Check if the input matches the valid time format
    if (timeRegex.test(inputTime)) {
      return inputTime; // Input is already in 24-hour format
    } else {
      // Attempt to parse the input as a 12-hour time format (e.g., "hh:mm AM/PM")
      const twelveHourTime = new Date(
        `01/01/2023 ${inputTime}`
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Extract hours and minutes from the parsed time
      const [formattedHours, formattedMinutes] = twelveHourTime.split(":");

      // Combine the formatted hours and minutes to create a 24-hour time string
      return `${formattedHours}:${formattedMinutes}`;
    }
  }

  if (tManage) {
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
              <img width={15} src={train_icon} />
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
                        {isEdit ? "Edit Train" : "Create Train"}
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
                          <div className="profile_avatar">
                            <div
                              className="profile_avatar-wrapper"
                              onClick={handleInput}
                            >
                              <div className="avatar">
                                <img
                                  className="profile_avatar-wrapper_img"
                                  src={train.imagePath}
                                  alt="Train Image"
                                />
                              </div>
                              <img
                                className="profile_avatar-wrapper_svg"
                                src={photo_icon}
                              />
                            </div>
                            <input
                              name="train image"
                              ref={inputFile}
                              type="file"
                              className="profile_avatar-input"
                              id="imageUpload"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
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
                            Train Registraion Number
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
              {/* <div
                 className="modal fade"
                 id="exampleModalCenter1"
                 tabIndex="-1"
                 role="dialog"
                 aria-labelledby="exampleModalCenterTitle1"
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
                         id="exampleModalCenterTitle1"
                       >
                         Train Schedules
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
                       <TrainScheduleManagement
                         key={sCount}
                         auth={auth}
                         train={train}
                         token={token}
                         setKey={setKey}
                       />
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
                       {auth.role == "backoffice" && (
                         <button
                           type="button"
                           className="btn btn-primary"
                           data-dismiss="modal"
                           // onClick={}
                         >
                           Save
                         </button>
                       )}
                     </div>
                   </div>
                 </div>
               </div> */}
              <br />
              <br />
              {trains.length > 0 ? (
                <div style={{ padding: "10px", overflow: "auto" }}>
                  <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Registration No</th>
                        <th scope="col">Train Name</th>
                        <th scope="col">Active Status</th>
                        <th scope="col">Train Schedules</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {trains.map((u) => (
                        <tr key={u.id} className="pointer">
                          <td>
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "50px",
                              }}
                              src={u.imagePath}
                              alt="Train Image"
                            />
                          </td>
                          <th scope="row">{u.registraionNo}</th>
                          <td>{u.name}</td>
                          <td>
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
                                  ? "rgb(0, 168, 8)"
                                  : "rgb(209, 99, 8)",
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
                          </td>
                          <td>
                            <div
                            //  data-toggle="modal1"
                            //  data-target="#exampleModalCenter1"
                            >
                              <div
                                onClick={() => {
                                  setTrain({
                                    ...train,
                                    name: u.name,
                                    registraionNo: u.registraionNo,
                                    imagePath: u.imagePath,
                                  });
                                  setTManage(false);
                                  setSCallback(true);
                                }}
                                style={{
                                  cursor: "pointer",
                                  margin: "5px",
                                  width: "25%",
                                  borderRadius: "50px",
                                  justifyContent: "center",
                                  backgroundColor: "rgb(31, 95, 196)",
                                  alignItems: "center",
                                }}
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title="View Shedule"
                              >
                                <div
                                //  data-toggle="modal"
                                //  data-target="#exampleModalCenter1"
                                >
                                  <center>
                                    <img
                                      style={{ margin: "10px" }}
                                      width={10}
                                      src={list_icon}
                                    />
                                  </center>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {auth.role == "backoffice" && (
                              <div style={{ display: "flex", float: "right" }}>
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
  } else {
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
            <div
              className="modal fade"
              id="exampleModalCenter3"
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
                      {isSEdit ? "Edit Schedule" : "Create New Schedule"}
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
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train Work Day Type
                        </label>
                        <Select
                          id="daytype"
                          options={DayType}
                          value={sDayType}
                          onChange={(e) => {
                            setSDayType(e);
                          }}
                          placeholder="Search for a work day type..."
                          isSearchable={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train Class Types
                        </label>
                        <Select
                          isMulti
                          id="classtype"
                          options={ClassTypes}
                          value={sTrainClasses}
                          onChange={(e) => {
                            setSTrainClasses(e);
                          }}
                          placeholder="Search for a work day type..."
                          isSearchable={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput22c22"
                          className="form-label"
                        >
                          Train Speed Type
                        </label>
                        <Select
                          id="speedType"
                          options={TrainSpeed}
                          value={sTrainSpeed}
                          onChange={(e) => {
                            setSTrainSpeed(e);
                          }}
                          placeholder="Search for a work day type..."
                          isSearchable={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train Route
                        </label>
                        <Select
                          id="trainroute"
                          options={trainRoutesOptions}
                          value={trainRoutesOptionsSelect}
                          onChange={(e) => {
                            setTrainRoutesOptionsSelect(e);
                          }}
                          placeholder="Search for a train route..."
                          isSearchable={true}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train Strat Time
                        </label>
                        <input
                          value={schedule.startTime}
                          type="time"
                          className="form-control"
                          id="exampleFormControlInput11131"
                          placeholder="Colombo fort - Badulla"
                          onChange={(e) => {
                            const inputTime = e.target.value;
                            const formattedTime = formatTo24Hour(inputTime);

                            setSchedule({
                              ...schedule,
                              startTime: formattedTime,
                            });
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2222"
                          className="form-label"
                        >
                          Train End Time
                        </label>
                        <input
                          value={schedule.endTime}
                          type="time"
                          className="form-control"
                          id="exampleFormControlInput114131"
                          placeholder="Colombo fort - Badulla"
                          onChange={(e) => {
                            const inputTime = e.target.value;
                            const formattedTime = formatTo24Hour(inputTime);

                            setSchedule({
                              ...schedule,
                              endTime: formattedTime,
                            });
                          }}
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
                          id="trainstops"
                          options={trainStopsOptions}
                          value={trainStopsOptionsSelect}
                          onChange={(e) => {
                            setTrainStopsOptionsSelect(e);
                          }}
                          placeholder="Search for a train route's stops..."
                          isSearchable={true}
                        />
                      </div>
                      {cancelDates.map((date) => (
                        <div key={date.id} className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput2222"
                            className="form-label"
                          >
                            Train Cancel Date
                          </label>
                          <input
                            value={date.value}
                            type="date"
                            className="form-control"
                            id="exampleFormControlInput114131"
                            placeholder="Colombo fort - Badulla"
                            onChange={(e) => {
                              let cDates =
                                cancelDates.length > 0 ? [...cancelDates] : [];
                              cDates = cDates.map((da) => {
                                if (da.id === date.id) {
                                  return { id: date.id, value: e.target.value };
                                } else {
                                  return da;
                                }
                              });
                              setCancelDates(cDates);
                            }}
                          />
                        </div>
                      ))}
                      <div className="mb-3">
                        <div
                          style={{
                            padding: "10px",
                            backgroundColor: "rgb(87, 156, 62)",
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            textAlign: "center",
                            color: "white",
                          }}
                          onClick={() => {
                            const date = new Date();

                            const currentDay = String(date.getDate()).padStart(
                              2,
                              "0"
                            );

                            const currentMonth = String(
                              date.getMonth() + 1
                            ).padStart(2, "0");

                            const currentYear = date.getFullYear();
                            const cDates =
                              cancelDates.length > 0 ? [...cancelDates] : [];

                            const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

                            cDates.push({
                              id: dateCancelId + 1,
                              value: currentDate,
                            });
                            setDateCancelId(dateCancelId + 1);
                            setCancelDates(cDates);
                          }}
                        >
                          Add New Cancel Date
                        </div>
                      </div>
                      {/* <div className="mb-3">
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
                              </div> */}
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
                      onClick={
                        isSEdit ? updateTrainShedule : createTrainShedule
                      }
                    >
                      {loadingBtn && <Spinner />}
                      {isEdit ? "Update" : "Create"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <img width={15} src={list_icon} />
              <h5 style={{ marginLeft: "5px" }}>Train Schedule Management</h5>
            </div>
            <div
              style={{
                borderRadius: "20px",
                backgroundColor: "rgb(0, 0, 0,0.5)",
                overflow: "auto",
              }}
            >
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "20px",
                      alignContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div className="avatar2">
                      <img src={train.imagePath} alt="Train Image" />
                    </div>
                    <div style={{ textWrap: "wrap" }}>
                      <h1>{train.name}</h1>
                      <h6>Registration Number: {" " + train.registraionNo}</h6>
                      <h7>This train have {schedules.length} schedules</h7>
                    </div>
                  </div>
                  <div
                    style={{
                      gap: "20px",
                      alignContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        backgroundColor: "rgb(199, 199, 199)",
                        padding: "10px",
                        borderRadius: "20px",
                        minWidth: "200px",
                        alignContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        margin: "5px",
                      }}
                      onClick={() => {
                        setShedules([]);
                        setTrain({
                          ...train,
                          name: "",
                          imagePath:
                            "https://res.cloudinary.com/amiladevin1998/image/upload/v1696069476/download_cmzzo6.png",
                          registraionNo: "",
                        });
                        handleCreateModalClose2();
                        setSchedule({
                          id: "0",
                          dayType: 0,
                          trainRegistraionNo: train.registraionNo,
                          isCancel: true,
                          trainStops: [],
                          startTime: "",
                          endTime: "",
                          trainClasses: [],
                          cancelDates: [],
                          trainRouteId: "",
                          speed: "",
                        });
                        setTManage(true);
                        setTrainRoutes([]);
                      }}
                    >
                      Go Back
                    </div>
                    {auth.role == "backoffice" && (
                      <div
                        style={{
                          cursor: "pointer",
                          backgroundColor: "rgb(0, 163, 44)",
                          padding: "10px",
                          borderRadius: "20px",
                          minWidth: "200px",
                          alignContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          margin: "5px",
                        }}
                        data-toggle="modal"
                        data-target="#exampleModalCenter3"
                        onClick={() => {
                          setSchedule({
                            id: "0",
                            dayType: 0,
                            trainRegistraionNo: train.registraionNo,
                            isCancel: true,
                            trainStops: [],
                            startTime: "",
                            endTime: "",
                            trainClasses: [],
                            cancelDates: [],
                            trainRouteId: "",
                            speed: "",
                          });
                          getAllTrainRoutes();
                        }}
                      >
                        Add New Schedule
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {schedules.length > 0 ? (
                <>
                  {
                    //TODO: BODY
                  }
                </>
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
  }
};

export default TrainManagement;
