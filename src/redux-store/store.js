import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";


const initialState = {};
const middleware = [thunk];

if (window.location.href.includes('localhost')) {
  console.log('hello local host')
  middleware.push(createLogger())
}

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);
export default store;
