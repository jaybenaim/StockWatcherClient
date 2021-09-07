import local from "api/local";
import { SET_ERRORS, GET_STOCK_WATCHERS_BY_EMAIL } from "../types";

export const getStockWatchersByEmail = (payload) => async (dispatch) => {
  const { symbol, email = '', } = payload
  let symbolParam = ''
  try {
    if (symbol && symbol.length > 0) {
      symbolParam = `&symbol=${symbol}`
    }

    const response = await local.get(`api/watchers?email=${email}${symbolParam}`)

    if (response.status === 200) {
      dispatch ({
        type: GET_STOCK_WATCHERS_BY_EMAIL,
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
