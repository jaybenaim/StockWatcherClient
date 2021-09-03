import { GET_ERRORS, SET_ERRORS } from "../types";
const initialState = {
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return state;
    case SET_ERRORS:
      state.errors = {...state.errors, ...action.payload}
      return state;
    default:
      return state;
  }
}
