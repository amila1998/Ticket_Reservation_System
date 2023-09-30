import React from 'react'
import ticket_icon from "../assets/icons/ticket-solid.svg";

const TicketBookingManagement = () => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <img width={25} src={ticket_icon} />
        <h5 style={{ marginLeft: "10px" }}>Ticket Booking Management</h5>
      </div>
    </div>
  );
}

export default TicketBookingManagement