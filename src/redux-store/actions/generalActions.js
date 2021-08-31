import { SET_SHOW_MENU_FILTERS } from "../types";

export const setWindowWidth = (decoded) => {
  return {
    type: SET_SHOW_MENU_FILTERS,
    payload: decoded,
  };
};

