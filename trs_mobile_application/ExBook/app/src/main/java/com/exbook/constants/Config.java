package com.exbook.constants;

public class Config {
    public static final String MyPREFERENCES = "ExBookPrefs" ;
    public static final String TokenKey = "token";
    public static final String NIC = "nic";
    public static final String USERID = "userid";
    public static final String USERNAME = "username";
    public static final String BASE_URL = "http://20.253.71.70:80";
    //public static final String BASE_URL = "http://192.168.1.8:44355";
    public static final String USER_REGISTRATION_ENDPOINT = "/api/User";
    public static final String USER_LOGIN_ENDPOINT = "/api/Authentication/login";
    public static final String USER_DETAILS_ENDPOINT = "/api/Atherization/info";
    public static final String USER_DEACTIVATE_ENDPOINT = "/api/User/deactivate/";
    public static final String TRAINSCHEDULE_ENDPOINT = "/api/TrainSchedule";
    public static final String UPDATE_PROFILE_IMAGE_ENDPOINT = "/api/images";
    public static final String UPDATE_USER_ENDPOINT = "/api/Atherization/update";
    public static final String BOOKINGS_ENDPOINT = "/api/Reservation";
    public static final String GET_MY_BOOKINGS_ENDPOINT = "/api/Reservation/getAllReservationsByOwnerId";

}
