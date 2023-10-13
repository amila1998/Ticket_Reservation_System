export const AuthenticationAPI = {
  login: "/api/Authentication/login",
  forgot_password: "/api/Authentication/forgot_password",
};
export const ImageAPI = {
  uplaod: "/api/images",
};
export const AutherizationAPI = {
  info: "/api/Atherization/info",
  reset_password: "/api/Atherization/reset_password",
  update_profile: "/api/Atherization/update",
};

export const UserManagementAPI = {
  getAllUsers: "/api/User",
  user_create: "/api/User/create_user",
  activate_user: "/api/User/activate",
  user_update: "/api/User/update_user",
  user_activate_request: "/api/User/request_active_account",
  deactivate_user: "/api/User/deactivate",
};

export const TrainRoutesManagementAPI = {
  getAll: "/api/TrainRoutes",
  getAllActiveRoutes: "/api/TrainRoutes/getActiveRoutes",
  create: "/api/TrainRoutes",
  delete: "/api/TrainRoutes/deleteRoute",
  disable: "/api/TrainRoutes/disableRoute",
  enable: "/api/TrainRoutes/enableRoute",
  update: "/api/TrainRoutes/updateRoute",
};

export const TrainsManagementAPI = {
  getAll: "/api/Train",
  create: "/api/Train",
  activeAndDeactive: "api/Train/changeActiveStatus",
  update: "/api/Train",
};

export const TrainScheduleManagementAPI = {
  getSchedules: "/api/TrainSchedule",
  create: "/api/TrainSchedule",
};

export const ReservationManagementAPI = {
  getAllReservationsByCreatedBy : "/api/Reservation/getAllReservationsByCreatedBy",
};

export const RequestManagementAPI = {
  getAllRequests : "/api/Request/getMyRequestsByAgentId",
};