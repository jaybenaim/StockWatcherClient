import { combineReducers } from "redux";
import errorReducer from "./errorReducers";
import responsiveReducer from "./responsiveReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import generalReducers from "./generalReducers";
import watcherReducers from "./watcherReducers";

export default combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  general: generalReducers,
  responsive: responsiveReducer,
  watchers: watcherReducers,
  errors: errorReducer,
});
