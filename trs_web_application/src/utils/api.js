//api.js

// Define the Authentication API endpoints
export const AuthenticationAPI = {
  login: "/api/Authentication/login", // Endpoint for user login
  forgot_password: "/api/Authentication/forgot_password", // Endpoint for password reset
};

// Define the Image API endpoints
export const ImageAPI = {
  uplaod: "/api/images", // Endpoint for uploading images
};

// Define the Authorization API endpoints
export const AutherizationAPI = {
  info: "/api/Atherization/info", // Endpoint for user information retrieval
  reset_password: "/api/Atherization/reset_password", // Endpoint for resetting the password
  update_profile: "/api/Atherization/update", // Endpoint for updating user profile
};

// Define the User Management API endpoints
export const UserManagementAPI = {
  getAllUsers: "/api/User", // Endpoint for retrieving all users
  user_create: "/api/User/create_user", // Endpoint for creating a new user
  activate_user: "/api/User/activate", // Endpoint for activating a user
  user_update: "/api/User/update_user", // Endpoint for updating user details
  user_activate_request: "/api/User/request_active_account", // Endpoint for requesting activation
  deactivate_user: "/api/User/deactivate", // Endpoint for deactivating a user
  getTravelers: "/api/User/getTravelers" , // Endpoint for retrieving travelers
};

// Define the Train Routes Management API endpoints
export const TrainRoutesManagementAPI = {
  getAll: "/api/TrainRoutes", // Endpoint for retrieving all train routes
  getAllActiveRoutes: "/api/TrainRoutes/getActiveRoutes", // Endpoint for retrieving active train routes
  create: "/api/TrainRoutes", // Endpoint for creating a new train route
  delete: "/api/TrainRoutes/deleteRoute", // Endpoint for deleting a train route
  disable: "/api/TrainRoutes/disableRoute", // Endpoint for disabling a train route
  enable: "/api/TrainRoutes/enableRoute", // Endpoint for enabling a train route
  update: "/api/TrainRoutes/updateRoute", // Endpoint for updating a train route
};

// Define the Trains Management API endpoints
export const TrainsManagementAPI = {
  getAll: "/api/Train", // Endpoint for retrieving all trains
  create: "/api/Train", // Endpoint for creating a new train
  activeAndDeactive: "api/Train/changeActiveStatus", // Endpoint for changing the active status of a train
  update: "/api/Train", // Endpoint for updating train details
};

// Define the Train Schedule Management API endpoints
export const TrainScheduleManagementAPI = {
  getSchedules: "/api/TrainSchedule", // Endpoint for retrieving train schedules
  create: "/api/TrainSchedule", // Endpoint for creating a new train schedule
  update: "/api/TrainSchedule", // Endpoint for updating a train schedule (Endpoint needs to be specified)
  cancel: "", // Endpoint for canceling a train schedule (Endpoint needs to be specified)
};

// Define the Reservation Management API endpoints
export const ReservationManagementAPI = {
  getAllReservationsByCreatedBy:
    "/api/Reservation/getAllReservationsByCreatedBy", // Endpoint for retrieving reservations by creator
  create: "/api/Reservation", // Endpoint for creating a new reservation
  update: "/api/Reservation/updateReservation", // Endpoint for updating a reservation
  delete: "/api/Reservation", // Endpoint for deleting a reservation
};

// Define the Request Management API endpoints
export const RequestManagementAPI = {
  getAllRequests: "/api/Request/getMyRequestsByAgentId", // Endpoint for retrieving requests by agent ID
  update: "/api/Request", // Endpoint for updating a request
};
