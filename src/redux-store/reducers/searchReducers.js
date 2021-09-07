import { SET_AUTOCOMPLETE_RESULTS } from "../types";

const initialState = {
 searchResults: []
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTOCOMPLETE_RESULTS:
      state.searchResults = action.payload
      return {
        ...state,
      };

    default:
      return state;
  }
}
