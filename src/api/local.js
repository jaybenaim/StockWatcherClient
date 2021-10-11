import axios from "axios";

const csrfTokenRegex = RegExp(/(csrftoken=.*;|csrftoken=.*)/)
const csrfToken = document.cookie?.match(csrfTokenRegex) ? document.cookie?.match(csrfTokenRegex)[0] : ''
const fbToken = localStorage.getItem('fb-token')
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = csrfToken;

let local;
if (fbToken !== undefined) {

  const headers =  {
    // "Authorization" : "Token ${token}"
  }

  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken
  }

  if (fbToken) {
    headers['Authorization'] = `Token ${fbToken}`
  }

  local = axios.create({
    baseURL: "https://stock-watcher-api.herokuapp.com/api",
    withCredentials: true,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken',
    headers
  });
}

export default local