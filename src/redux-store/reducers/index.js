import { combineReducers } from "redux";
import errorReducer from "./errorReducers";
import responsiveReducer from "./responsiveReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import generalReducers from "./generalReducers";
import watcherReducers from "./watcherReducers";
import searchReducers from "./searchReducers";
import tickerReducers from "./tickerReducers";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  general: generalReducers,
  responsive: responsiveReducer,
  search: searchReducers,
  tickers: tickerReducers,
  watchers: watcherReducers,
  errors: errorReducer,
});
