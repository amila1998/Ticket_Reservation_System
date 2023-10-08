import React, { useEffect, useState } from "react";
import { ClassTypes } from "../utils/TrainSheduleConfigData";
import Select from "react-select";
import user_icon from "../assets/icons/user-solid.svg";
import plus_icon from "../assets/icons/plus-solid.svg";
import edit_icon from "../assets/icons/pen-to-square-solid.svg";
import wrong_icon from "../assets/icons/wrong-svgrepo-com.svg";
import delete_icon from "../assets/icons/trash-solid.svg";
import track_icon from "../assets/icons/track.svg";
import correct_icon from "../assets/icons/correct-svgrepo-com.svg";


const Schedule = () => {
  return <div>NewSchedule</div>;
};

const TrainScheduleManagement = (props) => {
  const { shedules, auth, train, getShedules, setShedules} = props;
  const [trainClasses,setTrainClasess]=useState([])
//   const [shedules, setSheduleList] = useState([...shedules]);
  console.log(
    "🚀 ~ file: TrainScheduleManagement.js:21 ~ TrainScheduleManagement ~ shedules:",
    shedules
  );
  const [isOpen,setIsOpen]=useState([])
  let tmpId = 0

  useEffect(() => {
    if (shedules.length > 0) {
      let obj = [];
      for (const item of shedules) {
        obj.push({ id: item.id, isOpen: false });
      }
      setIsOpen(obj);
    }
  }, [shedules]);

  const addNewSchedule =()=>{
    let dataList = shedules
    const newShedule = {
      id: tmpId+1,
      dayType: 0,
      trainRegistraionNo: train.registraionNo,
      isCancel: true,
      trainStops: [],
      startTime: "",
      endTime: "",
      trainClasses: [],
      cancelDates: [],
      trainRouteId: "",
    };
    tmpId++;
    dataList.push(newShedule);
    setShedules(dataList);
  }

  const handleOpenCol = (id) => {
    const dataList = isOpen.map((s) => {
        if (id === s.id) {
          const data = { id: s.id, isOpen: !s.isOpen };
          return data;
        } else {
          return s;
        }
    });
    setIsOpen(dataList);
  }

  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
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
          <h7>
            This train have {shedules.length ? shedules.length : 0}{" "}
            schedules
          </h7>
        </div>
      </div>
      {shedules.length > 0 ? (
        <>
          {shedules.map((s) => (
            <div key={s.id}>
                asdfasd
            </div>
          ))}
          {auth.role == "backoffice" && (
            <div
              style={{
                cursor: "pointer",
                borderRadius: "50px",
                justifyContent: "center",
                backgroundColor: "rgb(0, 163, 44)",
                alignItems: "center",
                marginRight: "20px",
              }}
              onClick={addNewSchedule}
            >
              <div
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add New Schedule"
              >
                <center>
                  <img style={{ margin: "10px" }} width={10} src={plus_icon} />
                </center>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {auth.role == "backoffice" && (
            <div
              style={{
                cursor: "pointer",
                borderRadius: "50px",
                justifyContent: "center",
                backgroundColor: "rgb(0, 163, 44)",
                alignItems: "center",
                marginRight: "20px",
              }}
              onClick={addNewSchedule}
            >
              <div
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add New Schedule"
              >
                <center>
                  <img style={{ margin: "10px" }} width={10} src={plus_icon} />
                </center>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrainScheduleManagement;

//  <div style={{ padding: "5px" }}>
//    <form>
//      <div className="mb-3">
//        <label htmlFor="exampleFormControlInput2222" className="form-label">
//          Train End Station
//        </label>
//        <Select
//          id="trainclasses"
//          options={ClassTypes}
//          value={trainClasses}
//          onChange={(e) => {
//            setTrainClasess(e);
//          }}
//          placeholder="Search for a station..."
//          isSearchable={true}
//        />
//      </div>
//      <div className="mb-3">
//        <label htmlFor="exampleFormControlInput2222" className="form-label">
//          Train End Station
//        </label>
//        <Select
//          id="trainclasses"
//          options={ClassTypes}
//          value={trainClasses}
//          onChange={(e) => {
//            setTrainClasess(e);
//          }}
//          placeholder="Search for a station..."
//          isSearchable={true}
//        />
//      </div>
//    </form>
//  </div>;
