import local from "api/local";
import { SET_ERRORS, RECENT_TICKERS } from "../types";

export const getRecentTickers = (payload) => async (dispatch) => {
  const { all = '' } = payload || {}

  let param = ''
  try {
    if (all && all == 'true') {
      param = '?all=true'
    }

    const response = await local.get(`/tickers${param}`)

    if (response.status === 200) {
      dispatch ({
        type: RECENT_TICKERS,
        payload: response.data.results,
      });
    }

  } catch(err) {
    return dispatch({
      type: SET_ERRORS,
      payload: err,
    });
  }
};
