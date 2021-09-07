import axios from "axios";

const csrfTokenRegex = RegExp(/(csrftoken=.*;|csrftoken=.*)/)
const csrfToken = document.cookie?.match(csrfTokenRegex) ? document.cookie?.match(csrfTokenRegex)[0] : ''
const fbToken = localStorage.getItem('fb-token')
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = csrfToken;

let local;
if (fbToken !== undefined) {

  const headers =  {
    "X-CSRFToken": csrfToken,
    "Authorization": `Token ${fbToken}`
  }

  local = axios.create({
    baseURL: "http://localhost:9009",
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
    headers
  });
}

export default local