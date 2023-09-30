import React from 'react'
import dashboard_icon from "../assets/icons/gauge-solid.svg";

const DashboardComp = () => {
  return (
    <div>
      <div style={{ display: "flex",alignItems:"baseline" }}>
        <img width={15} src={dashboard_icon} />
        <h5 style={{marginLeft:"10px"}}>Dashboard</h5>
      </div>
    </div>
  );
}

export default DashboardComp;