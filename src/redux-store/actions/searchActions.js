import local from "api/local";
import { SET_AUTOCOMPLETE_RESULTS, SET_ERRORS } from "../types";

export const autocompleteSearch = (payload) => async (dispatch) => {
  const { url } = payload

  try {
    const response = await local.get(url)

    if (response.status === 200) {
      const results = response.data.results || []

      return dispatch({
        type: SET_AUTOCOMPLETE_RESULTS,
        payload: results,
      })
    }
  } catch(err) {
    return dispatch({
      type: SET_ERRORS,
      payload: err
    })
  }
}
