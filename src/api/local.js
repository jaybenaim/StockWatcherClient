import axios from "axios";
const csrfTokenRegex = RegExp(/(csrftoken=.*;|csrftoken=.*)/)
const csrfToken = document.cookie?.match(csrfTokenRegex) ? document.cookie?.match(csrfTokenRegex)[0] : ''

// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = csrfToken;
const headers =  {
  "X-CSRFToken": csrfToken
}

export default axios.create({
  baseURL: "https://d546-2607-fea8-3f60-6ff0-d066-1a43-dba9-77ac.ngrok.io/",
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers
});
