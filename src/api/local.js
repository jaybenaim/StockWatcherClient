import axios from "axios";

const csrfTokenRegex = RegExp(/(csrftoken=.*;|csrftoken=.*)/)
const csrfToken = document.cookie?.match(csrfTokenRegex) ? document.cookie?.match(csrfTokenRegex)[0] : ''
const fbToken = localStorage.getItem('fb-token')
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = csrfToken;

let local;

const headers =  {
  // "Authorization" : "Token ${token}"
}

if (csrfToken) {
  headers['X-CSRFToken'] = csrfToken
}

if (fbToken) {
  headers['Authorization'] = `Token ${fbToken}`
}

let baseURL = "https://stock-watcher-api.herokuapp.com/api"

if (process.env.REACT_APP_ENV === "development") {
  baseURL = "http://localhost:8000/api"
}

local = axios.create({
  baseURL,
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers
});

export default local