import React, { useState } from "react";
import user_icon from "../assets/icons/user-solid.svg";
import dashboard_icon from "../assets/icons/gauge-solid.svg";
import ticket_icon from "../assets/icons/ticket-solid.svg";
import train_icon from "../assets/icons/train-solid.svg";
import track_icon from "../assets/icons/track.svg";
import DashboardComp from "../components/Dashboard";
import UserManagement from "../components/UserManagement";
import TicketBookingManagement from "../components/TicketBookingManagement";
import TrainManagement from "../components/TrainManagement";
import TrainRoutesManagement from "../components/TrainRoutesManagement";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const [isDasboardSelected, setIsDashboardSelected]=useState(true)
    const [isUserManagementSelected, setIsUserManagementSelected]=useState(false)
    const [isTicketBookingManagementSelected, setIsTicketBookingManagementSelected]=useState(false)
    const [isTrainManagementSelected, setIsTrainManagementSelected]=useState(false)
    const [isRouteManagementSelected, setIsRouteManagementSelected]=useState(false)
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div className="nav_side_bar" style={{}}>
        <div
          className={isDasboardSelected ? "nav_item_selected" : "nav_item"}
          onClick={() => {
            setIsDashboardSelected(true);
            setIsUserManagementSelected(false);
            setIsTicketBookingManagementSelected(false);
            setIsTrainManagementSelected(false);
            setIsRouteManagementSelected(false);
          }}
        >
          <img width={20} src={dashboard_icon} />

          <div className="nav_text">Dashboard</div>
        </div>
        <div
          className={
            isUserManagementSelected ? "nav_item_selected" : "nav_item"
          }
          onClick={() => {
            setIsDashboardSelected(false);
            setIsUserManagementSelected(true);
            setIsTicketBookingManagementSelected(false);
            setIsTrainManagementSelected(false);
            setIsRouteManagementSelected(false);
          }}
        >
          <img width={20} src={user_icon} />

          <div className="nav_text">User Management</div>
        </div>
        {user.role == "travel_agent" && (
          <div
            className={
              isTicketBookingManagementSelected
                ? "nav_item_selected"
                : "nav_item"
            }
            onClick={() => {
              setIsDashboardSelected(false);
              setIsUserManagementSelected(false);
              setIsTicketBookingManagementSelected(true);
              setIsTrainManagementSelected(false);
              setIsRouteManagementSelected(false);
            }}
          >
            <img width={20} src={ticket_icon} />

            <div className="nav_text">Ticket Booking Management</div>
          </div>
        )}
        <div
          className={
            isTrainManagementSelected ? "nav_item_selected" : "nav_item"
          }
          onClick={() => {
            setIsDashboardSelected(false);
            setIsUserManagementSelected(false);
            setIsTicketBookingManagementSelected(false);
            setIsTrainManagementSelected(true);
            setIsRouteManagementSelected(false);
          }}
        >
          <img width={20} src={train_icon} />

          <div className="nav_text">Train Management</div>
        </div>
        <div
          className={
            isRouteManagementSelected ? "nav_item_selected" : "nav_item"
          }
          onClick={() => {
            setIsDashboardSelected(false);
            setIsUserManagementSelected(false);
            setIsTicketBookingManagementSelected(false);
            setIsTrainManagementSelected(false);
            setIsRouteManagementSelected(true);
          }}
        >
          <img width={20} src={track_icon} />

          <div className="nav_text">Train Routes Management</div>
        </div>
      </div>
      <div className="dash">
        {isDasboardSelected && <DashboardComp />}
        {isUserManagementSelected && <UserManagement />}
        {user.role == "travel_agent" && isTicketBookingManagementSelected && (
          <TicketBookingManagement />
        )}
        {isTrainManagementSelected && <TrainManagement />}
        {isRouteManagementSelected && <TrainRoutesManagement />}
      </div>
    </div>
  );
};

export default Dashboard;
