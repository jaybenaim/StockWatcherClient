import axios from "axios";

export default axios.create({
  baseURL: "http://isaacs-home-services.herokuapp.com/api",
});
