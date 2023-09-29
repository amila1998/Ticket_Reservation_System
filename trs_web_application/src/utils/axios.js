import axios from "axios";
import { configs } from "../config/index";

//create instance of each services here
export const getAxiosInstance = () => {
  return axios.create({
    baseURL: configs.SERVER_URL,
  });
};


