import local from "api/local";
import * as T from "../types";

export const setErrors = (decoded) => {
  return {
    type: T.SET_ERRORS,
    payload: decoded,
  };
};

export const setWindowWidth = (decoded) => {
  return {
    type: T.SET_SHOW_MENU_FILTERS,
    payload: decoded,
  };
};

export const checkDbStatus = (payload) => async (dispatch) => {

  try {
    const dbResponse = await local.get('/status')

    dispatch({
      type: T.SET_DB_STATUS,
      payload: dbResponse.data
    })
  } catch (err) {
    console.log(err)
    dispatch({
      type: T.SET_DB_STATUS,
      payload: {"status": "sleeping", timestamp: new Date()}
    })

    dispatch({
      type: T.SET_ERRORS,
      payload: err
    })
  }
}