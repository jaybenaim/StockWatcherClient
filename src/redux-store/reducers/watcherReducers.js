import { GET_STOCK_WATCHERS_BY_EMAIL } from "../types";

const initialState = {
  watchersForUser: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STOCK_WATCHERS_BY_EMAIL:
      console.log(action)
      state.watchersForUser = action.payload

      return {
        ...state,
      };

    default:
      return state;
  }
}
