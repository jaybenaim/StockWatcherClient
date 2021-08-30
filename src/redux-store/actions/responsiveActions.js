import { SET_WINDOW_WIDTH, GET_SCREEN_SIZE } from "../types";

export const setWindowWidth = (decoded) => {
  return {
    type: SET_WINDOW_WIDTH,
    payload: decoded,
  };
};

export const getWindowWidth = (decoded) => {
  return {
    type: GET_SCREEN_SIZE,
    payload: decoded,
  };
};


