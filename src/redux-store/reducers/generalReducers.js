import * as T from "../types";

const initialState = {
  showSearchFilters: false,
  dbStatus: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case T.SET_SHOW_MENU_FILTERS:
      state.showSearchFilters = action.payload
      return {...state};
    case T.SET_DB_STATUS:
      state.dbStatus = action.payload
      return {...state};
    default:
      return {...state};
  }
}
