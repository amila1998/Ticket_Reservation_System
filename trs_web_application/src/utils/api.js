export const AuthenticationAPI = {
  login: "/api/Authentication/login",
  forgot_password: "/api/Authentication/forgot_password",
};
export const AutherizationAPI = {
  info: "/api/Atherization/info",
  reset_password: "/api/Atherization/reset_password",
};

export const UserManagementAPI = {
  getAllUsers: "/api/User",
  user_create: "/api/User/create_user",
  activate_user: "/api/User/activate",
  user_update: "/api/User/update_user",
  user_activate_request: "/api/User/request_active_account",
};

export const TrainRoutesManagementAPI = {
  getAll: "/api/TrainRoutes",
  create: "/api/TrainRoutes",
  delete: "/api/TrainRoutes/deleteRoute",
  disable: "/api/TrainRoutes/disableRoute",
  enable: "/api/TrainRoutes/enableRoute",
  update: "/api/TrainRoutes/updateRoute",
};