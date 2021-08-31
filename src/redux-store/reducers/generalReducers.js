import { SET_SHOW_MENU_FILTERS } from "../types";

const initialState = {
  showSearchFilters: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SHOW_MENU_FILTERS:
      state.showSearchFilters = action.payload
      return {...state};
    default:
      return {...state};
  }
}
