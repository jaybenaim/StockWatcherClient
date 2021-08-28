import axios from "axios";

export default axios.create({
  baseURL: "https://stock-watcher-7b087-default-rtdb.firebaseio.com/",
});
