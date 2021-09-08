import { RECENT_TICKERS } from "../types";

const initialState = {
  recentTickers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RECENT_TICKERS:
      state.recentTickers = action.payload
      return {
        ...state,
      };

    default:
      return state;
  }
}
