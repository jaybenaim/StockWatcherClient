import { combineReducers } from "redux";
import errorReducer from "./errorReducers";
import responsiveReducer from "./responsiveReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

export default combineReducers({
  errors: errorReducer,
  responsive: responsiveReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
