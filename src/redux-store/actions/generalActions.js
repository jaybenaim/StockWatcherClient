import { SET_SHOW_MENU_FILTERS, SET_ERRORS } from "../types";

export const setErrors = (decoded) => {
  return {
    type: SET_ERRORS,
    payload: decoded,
  };
};

export const setWindowWidth = (decoded) => {
  return {
    type: SET_SHOW_MENU_FILTERS,
    payload: decoded,
  };
};

