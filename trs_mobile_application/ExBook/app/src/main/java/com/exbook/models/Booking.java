package com.exbook.models;

public class Booking {
    private String id ;
    private String createdAt;
    private String createdBy;
    private String scheduleId;
    private String pickStation;
    private String dropStation;
    private String bookingDate;
    private int ticketCount;
    private int ticketPrice;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(String scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getPickStation() {
        return pickStation;
    }

    public void setPickStation(String pickStation) {
        this.pickStation = pickStation;
    }

    public String getDropStation() {
        return dropStation;
    }

    public void setDropStation(String dropStation) {
        this.dropStation = dropStation;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public int getTicketCount() {
        return ticketCount;
    }

    public void setTicketCount(int ticketCount) {
        this.ticketCount = ticketCount;
    }

    public int getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(int ticketPrice) {
        this.ticketPrice = ticketPrice;
    }
}
