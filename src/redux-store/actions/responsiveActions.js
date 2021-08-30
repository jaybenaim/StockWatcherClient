import { SET_WINDOW_WIDTH } from "../types";

export const setWindowWidth = (decoded) => {
  return {
    type: SET_WINDOW_WIDTH,
    payload: decoded,
  };
};

